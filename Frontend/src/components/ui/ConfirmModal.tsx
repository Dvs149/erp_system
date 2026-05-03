interface Props {
    open: boolean;
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
}

const ConfirmModal = ({
    open,
    title = "Confirm",
    message,
    onConfirm,
    onCancel,
    loading,
}: Props) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40  z-50">

            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">

                <h3 className="text-lg font-semibold mb-2">{title}</h3>

                <p className="text-gray-600 mb-4">{message}</p>

                <div className="flex justify-end space-x-2">

                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;