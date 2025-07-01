export default function maskAccountNumber(accountNumber) {
    const str = accountNumber?.toString() || "";
    return str.replace(/\d(?=\d{4})/g, "*");
}