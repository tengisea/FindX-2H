'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAllOlympiadsQuery } from '@/generated';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Building2,
  ChevronDown,
  ChevronUp,
  Eye,
  Award
} from 'lucide-react';

const AllOlympiadsPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [rankingFilter, setRankingFilter] = useState<string>('all');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [organizerFilter, setOrganizerFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>('name');

  const { data, loading, error } = useAllOlympiadsQuery();

  const olympiads = data?.allOlympiads || [];

  // Get unique values for filters
  const filterOptions = useMemo(() => {
    const statuses = new Set<string>();
    const rankingTypes = new Set<string>();
    const grades = new Set<string>();
    const locations = new Set<string>();
    const organizers = new Set<string>();

    olympiads.forEach((olympiad) => {
      if (olympiad.status) statuses.add(olympiad.status);
      if (olympiad.rankingType) rankingTypes.add(olympiad.rankingType);
      if (olympiad.location) locations.add(olympiad.location);
      if (olympiad.organizer?.organizationName) organizers.add(olympiad.organizer.organizationName);
      
      olympiad.classtypes?.forEach((classType) => {
        if (classType.classYear) grades.add(classType.classYear);
      });
    });

    return {
      statuses: Array.from(statuses).sort(),
      rankingTypes: Array.from(rankingTypes).sort(),
      grades: Array.from(grades).sort((a, b) => {
        const gradeA = parseInt(a.match(/GRADE_(\d+)/)?.[1] || '0');
        const gradeB = parseInt(b.match(/GRADE_(\d+)/)?.[1] || '0');
        return gradeA - gradeB;
      }),
      locations: Array.from(locations).sort(),
      organizers: Array.from(organizers).sort(),
    };
  }, [olympiads]);

  // Filter and sort olympiads
  const filteredAndSortedOlympiads = useMemo(() => {
    let filtered = olympiads.filter((olympiad) => {
      const matchesSearch = 
        olympiad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        olympiad.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        olympiad.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        olympiad.organizer?.organizationName?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || olympiad.status === statusFilter;
      const matchesRanking = rankingFilter === 'all' || olympiad.rankingType === rankingFilter;
      const matchesLocation = locationFilter === 'all' || olympiad.location === locationFilter;
      const matchesOrganizer = organizerFilter === 'all' || olympiad.organizer?.organizationName === organizerFilter;
      
      const matchesGrade = gradeFilter === 'all' || 
        olympiad.classtypes?.some(ct => ct.classYear === gradeFilter);

      return matchesSearch && matchesStatus && matchesRanking && 
             matchesLocation && matchesOrganizer && matchesGrade;
    });

    // Sort olympiads
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(a.occurringDay || '').getTime() - new Date(b.occurringDay || '').getTime();
        case 'status':
          return a.status.localeCompare(b.status);
        case 'organizer':
          return (a.organizer?.organizationName || '').localeCompare(b.organizer?.organizationName || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [olympiads, searchTerm, statusFilter, rankingFilter, gradeFilter, locationFilter, organizerFilter, sortBy]);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Olympiads</h2>
            <p className="text-gray-600">Please wait while we fetch all available competitions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Olympiads</h2>
            <p className="text-red-600 mb-4">{error.message}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                All Olympiad Competitions
              </h1>
              <p className="text-lg text-gray-600">
                Discover and explore all available olympiad competitions
              </p>
              <div className="flex items-center gap-4 mt-4">
                <Badge variant="secondary" className="text-sm bg-blue-100 text-blue-800 border-blue-200">
                  {filteredAndSortedOlympiads.length} Olympiads Found
                </Badge>
                <Badge variant="outline" className="text-sm bg-gray-100 text-gray-800 border-gray-300">
                  {olympiads.length} Total Available
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              >
                <Filter className="h-4 w-4" />
                Filters
                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search olympiads, organizers, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      {filterOptions.statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ranking Type
                  </label>
                  <Select value={rankingFilter} onValueChange={setRankingFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {filterOptions.rankingTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade Level
                  </label>
                  <Select value={gradeFilter} onValueChange={setGradeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Grades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grades</SelectItem>
                      {filterOptions.grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          Grade {getGradeNumber(grade)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {filterOptions.locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organizer
                  </label>
                  <Select value={organizerFilter} onValueChange={setOrganizerFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Organizers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Organizers</SelectItem>
                      {filterOptions.organizers.map((organizer) => (
                        <SelectItem key={organizer} value={organizer}>
                          {organizer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sort Options */}
          <div className="mt-4 flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="organizer">Organizer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Olympiads Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredAndSortedOlympiads.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Olympiads Found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters to find more competitions.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setRankingFilter('all');
                setGradeFilter('all');
                setLocationFilter('all');
                setOrganizerFilter('all');
              }}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {filteredAndSortedOlympiads.map((olympiad, index) => (
                <motion.div
                  key={olympiad.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  layout
                  transition={{ duration: 0.3, delay: index * 0.05 }}
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
                      </div>

                      {/* Class Types */}
                      {olympiad.classtypes && olympiad.classtypes.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Available Grades</span>
                            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                              {olympiad.classtypes.length} grades
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {olympiad.classtypes.slice(0, 3).map((classType) => (
                              <Badge key={classType.id} variant="outline" className="text-xs bg-green-100 text-green-800 border-green-300">
                                Grade {getGradeNumber(classType.classYear)}
                              </Badge>
                            ))}
                            {olympiad.classtypes.length > 3 && (
                              <Badge variant="outline" className="text-xs bg-gray-100 text-gray-800 border-gray-300">
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
                          className="flex-1 bg-white border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700"
                          onClick={() => router.push(`/olympiad/${olympiad.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllOlympiadsPage;
