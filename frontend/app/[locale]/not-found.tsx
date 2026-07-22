import { getTranslations } from 'next-intl/server';
import NotFoundComponent from '@/components/ui/not-found';

export default async function NotFoundPage() {
  const t = await getTranslations('notFound');

  return (
    <NotFoundComponent
      titleText={t('title')}
      descriptionText={t('description')}
      buttonText={t('buttonText')}
      buttonHref="/"
      animate={false}
      particleCount={4000}
    />
  );
}
