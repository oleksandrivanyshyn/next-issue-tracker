import { Box, Skeleton } from '@radix-ui/themes';

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl mx-auto space-y-4">
      <Skeleton height="2rem" />
      <Skeleton height="23rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
