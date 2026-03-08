import { Box, Skeleton } from '@radix-ui/themes';

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-6xl mx-auto space-y-3">
      <Skeleton height="2rem" />
      <Skeleton height="23rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
