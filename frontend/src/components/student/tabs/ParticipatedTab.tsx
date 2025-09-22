"use client";

import { useAllOlympiadsQuery } from "@/generated";
import { safeFormatDate } from "@/lib/dateUtils";
import { Card, CardContent } from "@/components/ui/card";

interface ParticipatedOlympiadRowProps {
  olympiadId: string;
  onViewDetails: (olympiad: any) => void;
}

const ParticipatedOlympiadRow = ({
  olympiadId,
  onViewDetails,
}: ParticipatedOlympiadRowProps) => {
  const {
    data: olympiadsData,
    loading,
    error,
  } = useAllOlympiadsQuery();

  if (loading) {
    return (
      <tr>
        <td colSpan={5} className="px-6 py-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </td>
      </tr>
    );
  }

  if (error || !olympiadsData?.allOlympiads) {
    return (
      <tr>
        <td colSpan={5} className="px-6 py-4 text-red-600 text-base">
          Error loading olympiad details (ID: {olympiadId})
        </td>
      </tr>
    );
  }

  const olympiad = olympiadsData.allOlympiads.find(o => o.id === olympiadId);
  
  if (!olympiad) {
    return (
      <tr>
        <td colSpan={5} className="px-6 py-4 text-red-600 text-base">
          Olympiad not found (ID: {olympiadId})
        </td>
      </tr>
    );
  }

  return (
    <tr className="hover:bg-muted/50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <div className="text-base font-medium text-foreground">
            {olympiad.name}
          </div>
          <div className="text-base text-muted-foreground truncate max-w-xs">
            {olympiad.description}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-base text-foreground">
        {safeFormatDate(olympiad.occurringDay)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-base text-foreground">
        {olympiad.location}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
        <button
          onClick={() => onViewDetails(olympiad)}
          className="text-primary hover:text-primary/80 mr-3"
        >
          View Details
        </button>
        <span className="text-muted-foreground">Participated</span>
      </td>
    </tr>
  );
};

interface ParticipatedTabProps {
  student: any;
  loading: boolean;
  onViewDetails: (olympiad: any) => void;
  onBrowseOlympiads: () => void;
}

const ParticipatedTab = ({
  student,
  loading,
  onViewDetails,
  onBrowseOlympiads,
}: ParticipatedTabProps) => {
  if (
    !student?.participatedOlympiads ||
    student.participatedOlympiads.length === 0
  ) {
    return (
      <div className="content-wrapper container">
        <h2 className="text-5xl font-bold mb-8 text-center text-foreground items-center justify-center mt-20">
          Participated Olympiads
        </h2>

        <Card>
          <CardContent className="p-6 text-center">
            <svg
              className="w-16 h-16 text-muted-foreground mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Participated Olympiads
            </h3>
            <p className="text-muted-foreground text-lg">
              You haven&apos;t participated in any olympiads yet.
            </p>
            <button
              onClick={onBrowseOlympiads}
              className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              Browse Available Olympiads
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="content-wrapper container">
      <h2 className="text-4xl font-bold mb-8 text-center text-foreground items-center justify-center mt-20">
        Participated Olympiads
      </h2>

      <div className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-center text-foreground">
                {student.participatedOlympiads.length} Olympiad
                {student.participatedOlympiads.length !== 1 ? "s" : ""}{" "}
                Participated
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Olympiad Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {student.participatedOlympiads.map((olympiadId: string) => (
                  <ParticipatedOlympiadRow
                    key={olympiadId}
                    olympiadId={olympiadId}
                    onViewDetails={onViewDetails}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ParticipatedTab;
