import { Text, Group, Stack, UnstyledButton, Divider } from '@mantine/core';
import { format } from 'date-fns';
import classes from './home.module.css';
import { Link } from 'react-router-dom';
import PageListSkeleton from '@/features/home/components/page-list-skeleton';
import usePage from '@/features/page/hooks/use-page';

function RecentChanges() {
  const { recentPagesQuery } = usePage();
  const { data, isLoading, isError } = recentPagesQuery;

  if (isLoading) {
    return <PageListSkeleton />;
  }

  if (isError) {
    return <Text>Failed to fetch recent pages</Text>;
  }

  return (
    <div>
      {data.map((page) => (
        <>
          <UnstyledButton component={Link} to={`/p/${page.id}`}
                          className={classes.page} p="xs" key={page.id}>
            <Group wrap="noWrap">

              <Stack gap="xs" style={{ flex: 1 }}>
                <Text fw={500} size="sm">
                  {page.title || 'Untitled'}
                </Text>
              </Stack>

              <Text c="dimmed" size="xs">
                {format(new Date(page.createdAt), 'PPP')}
              </Text>
            </Group>
          </UnstyledButton>
          <Divider />
        </>
      ))}
    </div>
  );
}

export default RecentChanges;
