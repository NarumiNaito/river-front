'use client'

interface Props {
  metadata: Record<string, string>
}

export default function WaterMetadata({ metadata }: Props) {
  return (
    <ul className='mb-4'>
      {Object.entries(metadata).map(([key, val]) => (
        <li key={key} className='text-gray-700'>
          {key}: {val}
        </li>
      ))}
    </ul>
  )
}
