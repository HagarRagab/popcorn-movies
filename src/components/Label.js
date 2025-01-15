export default function Label({ icon, children }) {
    return (
        <p>
            <span>{icon}</span>
            <span>{children}</span>
        </p>
    );
}
