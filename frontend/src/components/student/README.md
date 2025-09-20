# Student Ranking System

This directory contains reusable components and hooks for managing student rankings and leaderboards.

## Components

### `StudentRankingDisplay`

A component that shows a student's current ranking position with optional details.

```tsx
import { StudentRankingDisplay } from "@/components/student";

<StudentRankingDisplay
  studentId="student-id-here"
  showDetails={true}
  className="custom-class"
/>;
```

**Props:**

- `studentId: string` - The ID of the student to display ranking for
- `showDetails?: boolean` - Whether to show additional details (default: true)
- `className?: string` - Additional CSS classes

### `StudentLeaderboard`

A component that displays a leaderboard of top students.

```tsx
import { StudentLeaderboard } from "@/components/student";

<StudentLeaderboard
  currentStudentId="student-id-here"
  showTop={10}
  className="custom-class"
/>;
```

**Props:**

- `currentStudentId?: string` - The ID of the current student (highlights their position)
- `showTop?: number` - Number of top students to show (default: 10)
- `className?: string` - Additional CSS classes

## Hooks

### `useStudentRanking`

A custom hook that fetches all students, calculates rankings, and provides ranking data.

```tsx
import { useStudentRanking } from "@/hooks/useStudentRanking";

const {
  allStudents,
  currentStudentRank,
  currentStudent,
  totalStudents,
  loading,
  error,
} = useStudentRanking("student-id-here");
```

**Returns:**

- `allStudents: StudentRanking[]` - Array of all students sorted by ranking
- `currentStudentRank: number | null` - Current student's position (1-based)
- `currentStudent: StudentRanking | null` - Current student's data
- `totalStudents: number` - Total number of students
- `loading: boolean` - Loading state
- `error: any` - Error state

## Ranking Algorithm

The ranking system uses the following criteria in order:

1. **Primary Ranking** - Uses the `ranking` field from the database (lower number = better rank)
2. **Total Medals** - If rankings are equal, students with more medals rank higher
3. **Gold Medals** - If total medals are equal, students with more gold medals rank higher
4. **Silver Medals** - If gold medals are equal, students with more silver medals rank higher
5. **Bronze Medals** - If silver medals are equal, students with more bronze medals rank higher
6. **Name** - If everything is equal, alphabetical order by name

## Usage Examples

### Basic Ranking Display

```tsx
<StudentRankingDisplay studentId="123" />
```

### Compact Ranking (no details)

```tsx
<StudentRankingDisplay studentId="123" showDetails={false} />
```

### Top 5 Leaderboard

```tsx
<StudentLeaderboard currentStudentId="123" showTop={5} />
```

### Custom Hook Usage

```tsx
const MyComponent = ({ studentId }) => {
  const { currentStudentRank, currentStudent, loading } =
    useStudentRanking(studentId);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Rank: #{currentStudentRank}</h2>
      <p>Medals: {currentStudent?.totalMedals}</p>
    </div>
  );
};
```

## Integration with ProfileTab

The ProfileTab component has been updated to use the new ranking system:

- Replaces static ranking display with dynamic `StudentRankingDisplay`
- Adds a `StudentLeaderboard` showing top 10 students
- Automatically highlights the current student's position

## Performance Considerations

- The `useStudentRanking` hook uses `useMemo` to optimize ranking calculations
- Components are memoized to prevent unnecessary re-renders
- GraphQL queries are cached by Apollo Client
- Only re-calculates rankings when student data changes

## Future Enhancements

- Add filtering by class/grade level
- Add time-based rankings (monthly, yearly)
- Add ranking change indicators (up/down arrows)
- Add ranking history visualization
- Add export functionality for leaderboards
