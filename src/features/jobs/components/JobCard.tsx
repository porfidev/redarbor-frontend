import { salaryFormatter } from '@/utils/salaryFormatter';
import { View, Text, Button } from 'react-native';
import type { Job } from '@/features/jobs/jobs.schema';

type JobCardProps = {
  job: Job;
  onOpen?: () => void;
};

function JobCard({ job, onOpen }: JobCardProps) {
  return (
    <View>
      <Text accessibilityRole="header">{job.title}</Text>
      <Text>{job.company}</Text>
      <Text>{job.city}</Text>

      <Text>
        {job.salary === null
          ? 'Salario no especificado'
          : salaryFormatter.format(job.salary)}
      </Text>

      <Text>{job.tags.join(' · ')}</Text>
      {onOpen ? <Button title={`Ver ${job.title}`} onPress={onOpen} /> : null}
    </View>
  );
}

export { JobCard };
