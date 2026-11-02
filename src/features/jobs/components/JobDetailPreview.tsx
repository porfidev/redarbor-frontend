import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import type { Job } from '../jobs.schema';
import { salaryFormatter } from '@/utils/salaryFormatter';

export function JobDetailPreview({
  job,
  onExpand,
}: {
  job: Job;
  onExpand: () => void;
}) {
  const [now] = useState(() => Date.now());
  const hours = Math.max(
    0,
    Math.floor((now - new Date(job.publishedAt).getTime()) / 3600000),
  );
  return (
    <View style={{ padding: 20, gap: 18 }}>
      <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            backgroundColor: '#070235',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 28,
              fontFamily: 'PlusJakartaSans_700Bold',
            }}
          >
            {job.company.trim().charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={{ color: '#74717F', fontSize: 12 }}>
            {hours ? `Hace ${hours} h` : 'Hace menos de 1 h'}
          </Text>
          <Text
            style={{
              color: '#070235',
              fontFamily: 'PlusJakartaSans_700Bold',
              fontSize: 20,
            }}
            numberOfLines={2}
          >
            {job.title}
          </Text>
          <Text
            style={{
              color: '#47464F',
              fontFamily: 'PlusJakartaSans_500Medium',
              fontSize: 13,
            }}
          >
            {job.company} · {job.city}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          backgroundColor: '#EFF4FF',
          padding: 16,
          borderRadius: 16,
        }}
      >
        <Ionicons
          name={job.salary === null ? 'eye-off-outline' : 'cash-outline'}
          size={26}
          color="#0058BE"
        />
        <View style={{ flex: 1, gap: 4 }}>
          <Text
            style={{
              color: '#47464F',
              fontSize: 10,
              fontFamily: 'PlusJakartaSans_600SemiBold',
            }}
          >
            SALARIO BRUTO
          </Text>
          <Text
            style={{
              color: '#070235',
              fontSize: 18,
              fontFamily: 'PlusJakartaSans_700Bold',
            }}
          >
            {job.salary === null
              ? 'Salario no revelado'
              : `${salaryFormatter.format(job.salary)} MXN / mes`}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
        {job.tags.slice(0, 4).map((tag, index) => (
          <View
            key={`${tag}-${index}`}
            style={{
              backgroundColor: '#E5EEFF',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 6,
            }}
          >
            <Text
              style={{
                color: '#070235',
                fontFamily: 'PlusJakartaSans_600SemiBold',
                fontSize: 12,
              }}
            >
              {tag}
            </Text>
          </View>
        ))}
        {job.tags.length > 4 && (
          <Text style={{ color: '#47464F', padding: 6 }}>
            +{job.tags.length - 4} tags
          </Text>
        )}
      </View>
      <Text
        numberOfLines={3}
        style={{
          color: '#47464F',
          fontFamily: 'PlusJakartaSans_400Regular',
          fontSize: 15,
          lineHeight: 23,
        }}
      >
        {job.description}
      </Text>
      <Pressable
        onPress={onExpand}
        accessibilityRole="button"
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingVertical: 10,
        }}
      >
        <Ionicons name="chevron-up" size={18} color="#74717F" />
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            color: '#74717F',
            fontFamily: 'PlusJakartaSans_600SemiBold',
            fontSize: 11,
          }}
        >
          DESLIZA HACIA ARRIBA PARA VER DETALLE COMPLETO (100%)
        </Text>
      </Pressable>
    </View>
  );
}
