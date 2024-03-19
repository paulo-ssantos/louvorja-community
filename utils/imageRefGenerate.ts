

export default function() {
    // code with 8 characters, numbers and lowercase letters
    const ref = Math.random().toString(36).substring(2, 10);
    return ref;
}
