'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MapPin, 
  Building2, 
  Trophy, 
  Award, 
  Eye,
  Users
} from 'lucide-react';

interface OlympiadCardProps {
  olympiad: {
    id: string;
    name: string;
    description?: string | null;
    closeDay?: string | null;
    location?: string | null;
    organizer?: {
      id: string;
      organizationName?: string | null;
      email?: string | null;
      logo?: string | null;
    } | null;
    classtypes?: Array<{
      id: string;
      classYear: string;
      maxScore?: number | null;
      occurringTime?: string | null;
      rooms?: number | null;
      questions?: Array<{
        id: string;
        classTypeId: string;
        questionName?: string | null;
        maxScore?: number | null;
      }> | null;
      medalists?: number | null;
      participants?: number | null;
      studentsAnswers?: number | null;
      olympiadId: string;
      gold?: number | null;
      silver?: number | null;
      bronze?: number | null;
      top10?: number | null;
    }> | null;
    scoreOfAward?: number | null;
    status: string;
    rankingType?: string | null;
    invitation?: boolean | null;
    occurringDay?: string | null;
  };
  index?: number;
  onViewDetails?: (olympiadId: string) => void;
}

export const OlympiadCard = ({ olympiad, index = 0, onViewDetails }: OlympiadCardProps) => {
  const router = useRouter();

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'CLOSED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'FINISHED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getGradeNumber = (classString: string) => {
    const match = classString.match(/GRADE_(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(olympiad.id);
    } else {
      router.push(`/olympiad/${olympiad.id}`);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, delay: index * 0.05 }
    },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {olympiad.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                {olympiad.description}
              </p>
            </div>
            <Badge className={`ml-3 ${getStatusColor(olympiad.status)}`}>
              {olympiad.status}
            </Badge>
          </div>

          {/* Details */}
          <div className="space-y-3 mb-4 flex-1">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span>{formatDate(olympiad.occurringDay)}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-green-500" />
              <span className="line-clamp-1">{olympiad.location || 'Location TBD'}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Building2 className="h-4 w-4 text-purple-500" />
              <span className="line-clamp-1">{olympiad.organizer?.organizationName || 'Unknown Organizer'}</span>
            </div>

            {olympiad.rankingType && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span>{olympiad.rankingType}</span>
              </div>
            )}

            {olympiad.scoreOfAward && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Award className="h-4 w-4 text-orange-500" />
                <span>Score: {olympiad.scoreOfAward}</span>
              </div>
            )}

            {/* Participant Stats */}
            {olympiad.classtypes && olympiad.classtypes.length > 0 && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Users className="h-4 w-4 text-indigo-500" />
                <span>
                  {olympiad.classtypes.reduce((total, ct) => total + (ct.participants || 0), 0)} participants
                </span>
              </div>
            )}
          </div>

          {/* Class Types */}
          {olympiad.classtypes && olympiad.classtypes.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Available Grades</span>
                <Badge variant="secondary" className="text-xs">
                  {olympiad.classtypes.length} grades
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {olympiad.classtypes.slice(0, 3).map((classType) => (
                  <Badge key={classType.id} variant="outline" className="text-xs">
                    Grade {getGradeNumber(classType.classYear)}
                  </Badge>
                ))}
                {olympiad.classtypes.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{olympiad.classtypes.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleViewDetails}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
