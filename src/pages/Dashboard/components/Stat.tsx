export const Stat = ({ label, value }: { label: string; value: string | number }) => {
    return (
        <div className="flex flex-col">
            <span className="text-sm text-gray-500">{label}</span>
            <span className="text-2xl font-semibold">{value}</span>
        </div>
    );
};
