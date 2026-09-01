export default function RoomFormError ({ error }) {
  // Renders error message
  return (
    <div className="error">
      <p>{error}</p>
    </div>
  );
};