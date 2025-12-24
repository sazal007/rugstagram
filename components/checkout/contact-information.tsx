"use client";

interface ContactInformationProps {
  email: string;
  onChange: (email: string) => void;
}

export function ContactInformation({ email, onChange }: ContactInformationProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-black">Contact Information</h2>
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-4 bg-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
        required
      />
    </div>
  );
}
