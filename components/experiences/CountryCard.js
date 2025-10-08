import Image from "next/image";
import Link from "next/link";

export function CountryCard({ country }) {
  return (
    <Link href={`/experiences?country=${country.name}`}>
      <div className="group relative h-64 overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-xl">
        <Image
          src={country.image}
          alt={country.name}
          fill
          className="object-cover transition-transform group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="mb-1 text-2xl font-bold">{country.name}</h3>
          <p className="text-sm text-gray-200">{country.description}</p>
        </div>
      </div>
    </Link>
  );
}
