import { presets } from "@/lib/presets";
import Header from "../common/Header";

interface SocialPresetsProps {
  setSelectedSocial: (social: string) => void;
}

const SocialPresets: React.FC<SocialPresetsProps> = ({ setSelectedSocial }) => {
  return (
    <div className="flex flex-col gap-2">
      <Header>Social Media Presets</Header>
      <div className="grid grid-cols-4 gap-3 w-full">
        {presets.map((preset) => (
          <button
            key={preset.name}
            className={`${preset.color} border border-gray-300 text-white
            hover:outline hover:outline-1 hover:outline-gray-700
            flex justify-center p-[18px] rounded-xl transition-all`}
            onClick={() => setSelectedSocial(preset.name)}
          >
            <preset.icon className="w-6 h-6" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialPresets;
