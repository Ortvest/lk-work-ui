import { useEffect, useState } from "react";

interface Prefix {
  country: string;
  code: string;
}

// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
export function usePhonePrefixes() {
  const [prefixes, setPrefixes] = useState<Prefix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrefixes = async (): Promise<void> => {
      try {
        setLoading(true);
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name,idd');
        if (!res.ok) throw new Error('Failed to fetch prefixes');
        const data = await res.json();

        const mapped: Prefix[] = data
          .filter((c: any) => c.idd?.root)
          .map((c: any) => ({
            country: c.name.common,
            code: `${c.idd.root}${c.idd.suffixes?.[0] || ''}`,
          }))
          .sort((a: { country: string }, b: { country: any }) => a.country.localeCompare(b.country));

        setPrefixes(mapped);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPrefixes();
  }, []);

  return { prefixes, loading, error };
}
