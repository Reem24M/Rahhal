export function PostContent({ description , className = "" }: { description: string,  className?: string;
 }) {
  return <p className={`px-4 text-gray-700 ${className}`}>{description}</p>;
}
