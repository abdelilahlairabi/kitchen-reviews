export default function CollectionIntro({ text }) {
  if (!text) return null;

  return (
    <div className="max-w-3xl mx-auto text-center my-8 px-4">
      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
        {text}
      </p>
    </div>
  );
}