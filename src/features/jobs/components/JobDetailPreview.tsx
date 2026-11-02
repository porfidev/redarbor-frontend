import * as componentStyles from './JobDetailPreview.styles';
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
    <View style={componentStyles.style1}>
      <View style={componentStyles.style2}>
        <View style={componentStyles.style3}>
          <Text style={componentStyles.style4}>
            {job.company.trim().charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={componentStyles.style5}>
          <Text style={componentStyles.style6}>
            {hours ? `Hace ${hours} h` : 'Hace menos de 1 h'}
          </Text>
          <Text style={componentStyles.style7} numberOfLines={2}>
            {job.title}
          </Text>
          <Text style={componentStyles.style8}>
            {job.company} · {job.city}
          </Text>
        </View>
      </View>
      <View style={componentStyles.style9}>
        <Ionicons
          name={job.salary === null ? 'eye-off-outline' : 'cash-outline'}
          size={26}
          color="#0058BE"
        />
        <View style={componentStyles.style10}>
          <Text style={componentStyles.style11}>SALARIO BRUTO</Text>
          <Text style={componentStyles.style12}>
            {job.salary === null
              ? 'Salario no revelado'
              : `${salaryFormatter.format(job.salary)} MXN / mes`}
          </Text>
        </View>
      </View>
      <View style={componentStyles.style13}>
        {job.tags.slice(0, 4).map((tag, index) => (
          <View key={`${tag}-${index}`} style={componentStyles.style14}>
            <Text style={componentStyles.style15}>{tag}</Text>
          </View>
        ))}
        {job.tags.length > 4 && (
          <Text style={componentStyles.style16}>
            +{job.tags.length - 4} tags
          </Text>
        )}
      </View>
      <Text numberOfLines={3} style={componentStyles.style17}>
        {job.description}
      </Text>
      <Pressable
        onPress={onExpand}
        accessibilityRole="button"
        style={componentStyles.style18}
      >
        <Ionicons name="chevron-up" size={18} color="#74717F" />
        <Text style={componentStyles.style19}>
          DESLIZA HACIA ARRIBA PARA VER DETALLE COMPLETO (100%)
        </Text>
      </Pressable>
    </View>
  );
}
