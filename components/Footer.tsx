import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white text-black border-t-4 border-black pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
                <div>
                    <h4 className="font-black text-2xl uppercase mb-6">HouseConnect</h4>
                    <p className="font-bold">Bridging the gap between homes and skilled professionals.</p>
                </div>
                <div>
                    <h4 className="font-black uppercase mb-6">Quick Links</h4>
                    <ul className="space-y-3 font-bold">
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/privacy">Privacy</Link></li>
                        <li><Link href="/terms">Terms</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-black uppercase mb-6">Contact</h4>
                    <p className="font-bold">+91 8263884655</p>
                    <p className="font-bold">support@houseconnect.in</p>
                </div>
            </div>
            <div className="text-center mt-12 pt-8 border-t-2 border-black border-dashed font-black uppercase">
                &copy; {new Date().getFullYear()} HouseConnect Pro · Made with ❤️ in India
            </div>
        </footer>
    );
}
