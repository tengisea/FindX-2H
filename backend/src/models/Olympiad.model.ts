import { Model, model, models, Schema } from "mongoose";

enum OlympiadRankingType {
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL",
  DISTRICT = "DISTRICT",
  SCHOOL = "SCHOOL",
  A_TIER = "A_TIER",
  B_TIER = "B_TIER",
  C_TIER = "C_TIER",
}

enum OlympiadStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  FINISHED = "FINISHED",
  CANCELLED = "CANCELLED",
  DRAFT = "DRAFT",
  UNDER_REVIEW = "UNDER_REVIEW",
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
        this.scoreOfAward = 400;
        break;
      case OlympiadRankingType.REGIONAL:
        this.scoreOfAward = 200;
        break;
      case OlympiadRankingType.DISTRICT:
        this.scoreOfAward = 100;
        break;
      case OlympiadRankingType.SCHOOL:
        this.scoreOfAward = 20;
        break;
      case OlympiadRankingType.A_TIER:
        this.scoreOfAward = 100;
        break;
      case OlympiadRankingType.B_TIER:
        this.scoreOfAward = 50;
        break;
      case OlympiadRankingType.C_TIER:
        this.scoreOfAward = 20;
        break;
      default:
        this.scoreOfAward = 0;
    }
  }
  next();
});

// Post-save middleware to automatically process rankings, send emails, and process invitations when Olympiad is finished
olympiadSchema.post("save", async function (doc) {
  if (this.isModified("status") && doc.status === "FINISHED") {
    try {
      // Import here to avoid circular dependency
      const { RankingService } = await import("../services/rankingService");
      const { InvitationService } = await import(
        "../services/invitationService"
      );
      const { sendOlympiadFinishedNotification } = await import(
        "../utils/email-services"
      );

      // Process rankings first
      const result = await RankingService.processOlympiadRankings(
        doc._id.toString()
      );
      console.log(
        `✅ Rankings processed: ${result.classTypesProcessed} class types, ${result.totalStudentsProcessed} students`
      );

      // Process invitations for private olympiads
      try {
        const invitationResults = await InvitationService.processInvitations(
          doc._id.toString()
        );

        if (invitationResults.length > 0) {
          console.log(`🎯 Invitation processing completed for ${doc.name}:`);
          invitationResults.forEach((result, index) => {
            if (result.success) {
              console.log(
                `  ✅ Class ${index + 1}: ${
                  result.invitedStudents
                } students invited to ${result.targetOlympiadName}`
              );
            } else {
              console.log(`  ⚠️ Class ${index + 1}: ${result.message}`);
            }
          });
        } else {
          console.log(
            `ℹ️ No invitations processed for ${doc.name} (not a private olympiad or no target olympiads found)`
          );
        }
      } catch (invitationError) {
        console.error(
          "❌ Error processing automatic invitations:",
          invitationError
        );
        // Don't throw error to avoid breaking the save operation
      }

      // Send thank you emails
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
