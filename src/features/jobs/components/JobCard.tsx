import { salaryFormatter } from '@/utils/salaryFormatter';
import { font } from '@expo/ui/swift-ui/modifiers';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEEDF2',
    padding: 16,
    gap: 14,
    marginBottom: 12,
  },
  pressed: { opacity: 0.75 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#211B4B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    includeFontPadding: false,
  },
  heading: { flex: 1, gap: 4 },
  title: {
    color: '#0B1C30',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 15,
  },
  secondary: {
    color: '#47464F',
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    includeFontPadding: false,
  },
  description: {
    color: 'rgb(71 70 79 / 0.9)',
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
  },
  metadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 1,
  },
  salary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DDF8EF',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  undisclosedSalary: {
    backgroundColor: '#E8EEFF',
    borderRadius: 8,
  },
  undisclosedSalaryText: {
    color: '#63616E',
    fontFamily: 'PlusJakartaSans_400Regular',
    fontStyle: 'italic',
  },
  salaryText: {
    color: '#070235',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
    includeFontPadding: false,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#EFF3FF',
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, flex: 1 },
  tag: {
    backgroundColor: '#E8EEFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  tagText: {
    color: '#070235',
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 10,
    includeFontPadding: false,
  },
  timestamp: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timeText: {
    color: '#47464F',
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 11,
    includeFontPadding: false,
  },
});

export { JobCard };
