export default function TableSkeleton({
  rowCount = 20,
  colCount = 7,
}: {
  rowCount?: number
  colCount?: number
}) {
  const Skeleton = ({ className = '' }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
  )

  return (
    <div className='w-full border border-gray-200 rounded-xl overflow-hidden'>
      {/* Header */}
      <div className='flex bg-gray-[#F9F9F9] px-6 py-4 '>
        {Array.from({ length: colCount }).map((_, i) => (
          <div key={i} className='flex-1 px-2'>
            <Skeleton className='h-4 w-3/5' />
          </div>
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rowCount }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className='flex items-center px-6 py-3  last:border-b-0 hover:bg-gray-50 transition'
        >
          {Array.from({ length: colCount }).map((_, colIdx) => (
            <div key={colIdx} className='flex-1 px-2'>
              <Skeleton className='h-4 w-full' />
            </div>
          ))}
        </div>
      ))}

      <span className='sr-only'>Loading...</span>
    </div>
  )
}
