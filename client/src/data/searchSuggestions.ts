type PartialTemplate = Partial<Template> & { _id: string; title: string };

export const searchSuggestions = (templates as PartialTemplate[]).map(template => ({
  id: template._id,
  title: template.title,
  type: 'template' as const,
  category: template.category || 'General',
  price: template.estimatedPrice || 0,
  framework: template.framework || 'Unknown',
  theme: template.theme || 'Default',
  platform: template.platform || 'Any',
  preview: template.previewImageUrl || '',
}));
