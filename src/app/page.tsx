import IssueSummary from '@/app/_components/IssueSummary';
import prisma from '@/lib/prisma';
import { Flex, Grid } from '@radix-ui/themes';
import IssueChart from '@/app/_components/IssueChart';
import LatestIssues from '@/app/_components/LatestIssues';

export default async function Home() {
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({ where: { status: 'OPEN' } }),
    prisma.issue.count({ where: { status: 'IN_PROGRESS' } }),
    prisma.issue.count({ where: { status: 'CLOSED' } }),
  ]);

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
