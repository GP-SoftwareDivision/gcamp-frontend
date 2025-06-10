import ClientInquiry from '@/app/(nav)/inquiry/ClientInquiry'

// ✅ page.tsx (server component)
export const metadata = {
  title: '문의사항',
}

export default function InquiryPage() {
  return <ClientInquiry />
}
