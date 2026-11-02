import { styles } from './JobCard.styles';
import { salaryFormatter } from '@/utils/salaryFormatter';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import type { Job } from '@/features/jobs/jobs.schema';

type JobCardProps = {
  job: Job;
  onOpen?: () => void;
};

function publishedLabel(date: string) {
  const minutes = Math.max(
    0,
    Math.floor((Date.now() - new Date(date).getTime()) / 60000),
  );
  if (minutes < 1) return 'Ahora';
  if (minutes < 60) return `Hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Hace ${hours} h`;
  return `Hace ${Math.floor(hours / 24)} d`;
}

function JobCard({ job, onOpen }: JobCardProps) {
  return (
    <Pressable
      onPress={onOpen}
      accessibilityRole={onOpen ? 'button' : undefined}
      accessibilityLabel={`Ver ${job.title}, ${job.company}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.initial}>
            {job.company.trim().charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.heading}>
          <Text style={styles.title} numberOfLines={2}>
            {job.title}
          </Text>
          <Text style={styles.secondary} numberOfLines={1}>
            {job.company}
          </Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {job.description}
      </Text>

      <View style={styles.metadata}>
        <View style={styles.location}>
          <Ionicons name="location-outline" size={12} color="#0058BE" />
          <Text style={styles.secondary}>{job.city}</Text>
        </View>
        <View
          style={[
            styles.salary,
            job.salary === null && styles.undisclosedSalary,
          ]}
        >
          <Ionicons
            name={job.salary === null ? 'eye-off-outline' : 'cash-outline'}
            size={12}
            color={job.salary === null ? '#63616E' : '#009D6C'}
          />
          <Text
            style={[
              styles.salaryText,
              job.salary === null && styles.undisclosedSalaryText,
            ]}
          >
            {job.salary === null
              ? 'Salario no revelado'
              : `${salaryFormatter.format(job.salary)} MXN / mes`}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.tags}>
          {job.tags.map((tag, index) => (
            <View key={`${tag}-${index}`} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={styles.timestamp}>
          <Ionicons name="time-outline" size={15} color="#63616E" />
          <Text style={styles.timeText}>{publishedLabel(job.publishedAt)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export { JobCard };
