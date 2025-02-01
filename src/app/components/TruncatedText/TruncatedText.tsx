export function TruncatedText({ content }: { content: string }) {
  return <div className="line-clamp-2">{content}</div>;
}
