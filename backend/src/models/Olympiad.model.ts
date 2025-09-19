import { Model, model, models, Schema } from "mongoose";

enum OlympiadRankingType {
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL",
  DISTRICT = "DISTRICT",
  SCHOOL = "SCHOOL",
}

enum OlympiadStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  FINISHED = "FINISHED",
  CANCELLED = "CANCELLED",
  DRAFT = "DRAFT",
}

type OlympiadSchemaType = {
  name: string;
  description: string;
  closeDay: Date;
  location: string;
  organizer: Schema.Types.ObjectId;
  participants: Schema.Types.ObjectId[];
  classtypes: Schema.Types.ObjectId[];
  scoreOfAward?: number;
  status: OlympiadStatus;
  occurringDay: Date;
  invitation: boolean;
  rankingType: OlympiadRankingType;
};

const olympiadSchema = new Schema<OlympiadSchemaType>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    closeDay: { type: Date, required: true },
    location: { type: String, required: true },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
    participants: [{ type: Schema.Types.ObjectId, ref: "Student" }],
    classtypes: [{ type: Schema.Types.ObjectId, ref: "ClassType" }],
    scoreOfAward: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(OlympiadStatus),
      default: OlympiadStatus.DRAFT,
      required: true,
    },
    occurringDay: { type: Date, required: true },
    invitation: { type: Boolean, default: false },
    rankingType: {
      type: String,
      enum: Object.values(OlympiadRankingType),
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to set scoreOfAward based on rankingType
olympiadSchema.pre("save", function (next) {
  if (this.isModified("rankingType") || this.isNew) {
    switch (this.rankingType) {
      case OlympiadRankingType.NATIONAL:
        this.scoreOfAward = 100;
        break;
      case OlympiadRankingType.REGIONAL:
        this.scoreOfAward = 75;
        break;
      case OlympiadRankingType.DISTRICT:
        this.scoreOfAward = 50;
        break;
      case OlympiadRankingType.SCHOOL:
        this.scoreOfAward = 25;
        break;
      default:
        this.scoreOfAward = 0;
    }
  }
  next();
});

// Post-save middleware to automatically process rankings and send emails when Olympiad is finished
olympiadSchema.post("save", async function (doc) {
  if (this.isModified("status") && doc.status === "FINISHED") {
    try {
      // Import here to avoid circular dependency
      const { RankingService } = await import("../services/rankingService");
      const { sendOlympiadFinishedNotification } = await import(
        "../utils/email-services"
      );

      console.log(
        `🏆 Automatically processing rankings for Olympiad: ${doc.name}`
      );
      const result = await RankingService.processOlympiadRankings(
        doc._id.toString()
      );

      console.log(
        `✅ Rankings processed: ${result.classTypesProcessed} class types, ${result.totalStudentsProcessed} students`
      );

      // Send thank you emails to participants
      console.log(
        `📧 Automatically sending thank you emails to participants of Olympiad: ${doc.name}`
      );
      try {
        const emailResult = await sendOlympiadFinishedNotification(
          doc._id.toString(),
          doc.name
        );
        console.log(
          `✅ Thank you emails sent: ${emailResult.sentCount}/${emailResult.totalParticipants} participants notified`
        );
      } catch (emailError) {
        console.error(
          "❌ Error sending automatic thank you emails:",
          emailError
        );
        // Don't throw error to avoid breaking the save operation
      }
    } catch (error) {
      console.error("❌ Error processing automatic rankings:", error);
      // Don't throw error to avoid breaking the save operation
    }
  }
});

export const OlympiadModel: Model<OlympiadSchemaType> =
  models["Olympiad"] || model("Olympiad", olympiadSchema);
