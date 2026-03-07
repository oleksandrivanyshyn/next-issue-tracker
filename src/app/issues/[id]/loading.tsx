import { Box, Card, Flex, Heading, Skeleton } from '@radix-ui/themes';

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skeleton height="32px" width="80%" />
      </Heading>

      <Flex gap="3" my="2" align="center">
        <Skeleton width="60px" height="24px" />
        <Skeleton width="120px" height="20px" />
      </Flex>

      <Card className="prose" mt="4">
        <Flex direction="column" gap="2">
          <Skeleton height="16px" />
          <Skeleton height="16px" />
          <Skeleton height="16px" width="70%" />
        </Flex>
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
