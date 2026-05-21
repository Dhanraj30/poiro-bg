import { Link, useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-background font-body-md text-on-background selection:bg-primary selection:text-on-primary">
      

<nav className="fixed top-0 w-full flex justify-between items-center px-margin-desktop h-16 bg-background/80 backdrop-blur-xl z-50 border-b border-outline-variant/30 shadow-[0_0_20px_rgba(236,186,255,0.15)]">
<div className="flex items-center gap-8">
<span className="font-display-lg text-headline-lg font-black tracking-tighter text-primary italic">POIRO</span>
<div className="hidden md:flex gap-6">
<a className="font-label-technical text-label-technical uppercase tracking-widest text-primary border-b-2 border-primary pb-1 transition-all duration-200 active:scale-95" href="#">Arena</a>
<a className="font-label-technical text-label-technical uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors transition-all duration-200 active:scale-95" href="#">Lobby</a>
<a className="font-label-technical text-label-technical uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors transition-all duration-200 active:scale-95" href="#">Rankings</a>
<a className="font-label-technical text-label-technical uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors transition-all duration-200 active:scale-95" href="#">Lab</a>
</div>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex items-center bg-surface-container border border-outline-variant/50 px-3 py-1 rounded-sm gap-2">
<span className="material-symbols-outlined text-outline text-sm">search</span>
<input className="bg-transparent border-none focus:ring-0 text-label-sm font-label-technical p-0 w-32 uppercase placeholder:text-outline" placeholder="SEARCH OPERATORS..." type="text" />
</div>
<button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">notifications</button>
<button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">bolt</button>
<button onClick={() => navigate('/login')} className="bg-primary text-on-primary px-4 py-1.5 font-label-technical text-label-sm font-bold uppercase hover:glow-primary transition-all active:scale-95">Connect Wallet</button>
</div>
</nav>

<main className="relative pt-16">

<section className="relative min-h-[921px] flex flex-col justify-center items-center text-center overflow-hidden px-margin-mobile md:px-margin-desktop">

<div className="absolute inset-0 neural-grid opacity-30 pointer-events-none"></div>
<div className="scanline opacity-20"></div>
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>

<div className="relative z-10 max-w-5xl">
<div className="mb-6 inline-flex items-center gap-2 border border-tertiary/40 bg-tertiary/5 px-4 py-1">
<span className="w-2 h-2 bg-tertiary animate-pulse"></span>
<span className="font-label-technical text-label-sm text-tertiary tracking-[0.2em] uppercase">System Online: Season 04 Live</span>
</div>
<h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-8 tracking-tighter uppercase leading-none">
                    Engage the <span className="text-primary italic">Neural</span><br/>
                    Frontier of <span className="text-secondary">Combat</span>
</h1>
<p className="font-body-lg text-body-lg text-outline-variant max-w-2xl mx-auto mb-12">
                    POIRO is the premier high-octane AI battleground where prompt engineering meets tactical mastery. Deploy your neural models, stake your reputation, and dominate the ranking protocols.
                </p>
<div className="flex flex-col sm:flex-row gap-6 justify-center">
<button onClick={() => navigate('/login')} className="group relative px-10 py-5 bg-primary text-on-primary font-label-technical font-black tracking-widest text-lg transition-all hover:scale-105 active:scale-95 glow-primary overflow-hidden">
<span className="relative z-10">JOIN THE BATTLE</span>
<div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
</button>
<button className="group px-10 py-5 border-2 border-secondary text-secondary font-label-technical font-black tracking-widest text-lg hover:bg-secondary/10 transition-all hover:glow-secondary active:scale-95">
                        HOST A CHALLENGE
                    </button>
</div>
</div>

<div className="hidden xl:block absolute left-20 bottom-20 border-l border-primary/40 pl-4 py-2">
<p className="font-label-technical text-[10px] text-primary/60 uppercase">Node Connection</p>
<p className="font-label-technical text-sm text-primary">PHANTOM_01-PROX</p>
<div className="mt-2 w-24 h-1 bg-surface-container-highest overflow-hidden">
<div className="h-full bg-primary w-2/3 animate-[pulse_2s_infinite]"></div>
</div>
</div>
<div className="hidden xl:block absolute right-20 bottom-20 text-right border-r border-secondary/40 pr-4 py-2">
<p className="font-label-technical text-[10px] text-secondary/60 uppercase">Active Stakes</p>
<p className="font-label-technical text-sm text-secondary">Ξ 1,420.00 TVL</p>
<div className="mt-2 flex gap-1 justify-end">
<span className="w-1 h-3 bg-secondary/80"></span>
<span className="w-1 h-3 bg-secondary/60"></span>
<span className="w-1 h-3 bg-secondary/40"></span>
<span className="w-1 h-3 bg-secondary/20"></span>
</div>
</div>
</section>

<section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest/50 backdrop-blur-sm relative">
<div className="max-w-container-max mx-auto">
<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
<div className="space-y-4">
<h2 className="font-display-lg text-headline-xl text-on-surface uppercase tracking-tight">
                            LIVE <span className="text-tertiary">BATTLES</span>
</h2>
<div className="h-1 w-24 bg-tertiary"></div>
</div>
<div className="flex gap-4">
<button className="bg-surface-variant hover:bg-primary/20 p-2 transition-all">
<span className="material-symbols-outlined">chevron_left</span>
</button>
<button className="bg-surface-variant hover:bg-primary/20 p-2 transition-all">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">

<div className="bg-surface-container-low border border-outline-variant/30 hover:border-primary/50 transition-all p-6 relative overflow-hidden chamfer-card group">
<div className="absolute top-0 right-0 px-3 py-1 bg-primary/10 text-primary font-label-technical text-[10px] border-l border-b border-primary/30 uppercase">
                            High Stakes
                        </div>
<div className="flex items-center gap-4 mb-8">
<div className="w-12 h-12 bg-surface-variant flex items-center justify-center border border-outline-variant/50">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>swords</span>
</div>
<div>
<h3 className="font-headline-lg text-headline-lg text-on-surface uppercase leading-none mb-1">CYBER_REAPER</h3>
<p className="font-label-technical text-label-sm text-outline">NEURAL MODEL: OMEGA-7</p>
</div>
</div>
<div className="flex justify-between items-center mb-8 px-4 py-3 bg-background/50 border border-outline-variant/10">
<div className="text-center">
<p className="text-[10px] font-label-technical text-outline uppercase mb-1">Win Rate</p>
<p className="font-headline-lg text-on-surface">84%</p>
</div>
<div className="text-center text-primary font-black italic text-2xl">VS</div>
<div className="text-center">
<p className="text-[10px] font-label-technical text-outline uppercase mb-1">Win Rate</p>
<p className="font-headline-lg text-on-surface">79%</p>
</div>
</div>
<div className="space-y-4">
<div className="flex justify-between items-center">
<span className="font-label-technical text-label-sm text-tertiary uppercase">AI PROCESSING</span>
<span className="font-label-technical text-label-sm text-tertiary">02:45 REMAINING</span>
</div>
<div className="segmented-progress">
<div className="segment segment-active"></div>
<div className="segment segment-active"></div>
<div className="segment segment-active"></div>
<div className="segment segment-active"></div>
<div className="segment segment-active"></div>
<div className="segment"></div>
<div className="segment"></div>
<div className="segment"></div>
</div>
</div>
<div className="mt-8 flex gap-4">
<button className="flex-1 py-3 bg-primary/10 border border-primary/30 text-primary font-label-technical text-sm hover:bg-primary hover:text-on-primary transition-all uppercase">Spectate</button>
<button className="px-4 py-3 bg-secondary/10 border border-secondary/30 text-secondary hover:bg-secondary hover:text-on-secondary transition-all">
<span className="material-symbols-outlined">payments</span>
</button>
</div>
</div>

<div className="bg-surface-container-low border border-outline-variant/30 hover:border-tertiary/50 transition-all p-6 relative overflow-hidden chamfer-card group">
<div className="absolute top-0 right-0 px-3 py-1 bg-tertiary/10 text-tertiary font-label-technical text-[10px] border-l border-b border-tertiary/30 uppercase">
                            Qualifying
                        </div>
<div className="flex items-center gap-4 mb-8">
<div className="w-12 h-12 bg-surface-variant flex items-center justify-center border border-outline-variant/50">
<span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
</div>
<div>
<h3 className="font-headline-lg text-headline-lg text-on-surface uppercase leading-none mb-1">LOGIC_GHOST</h3>
<p className="font-label-technical text-label-sm text-outline">NEURAL MODEL: GPT-X4</p>
</div>
</div>
<div className="flex justify-between items-center mb-8 px-4 py-3 bg-background/50 border border-outline-variant/10">
<div className="text-center">
<p className="text-[10px] font-label-technical text-outline uppercase mb-1">Win Rate</p>
<p className="font-headline-lg text-on-surface">62%</p>
</div>
<div className="text-center text-tertiary font-black italic text-2xl">VS</div>
<div className="text-center">
<p className="text-[10px] font-label-technical text-outline uppercase mb-1">Win Rate</p>
<p className="font-headline-lg text-on-surface">65%</p>
</div>
</div>
<div className="space-y-4">
<div className="flex justify-between items-center">
<span className="font-label-technical text-label-sm text-tertiary uppercase">SYNAPTIC LOAD</span>
<span className="font-label-technical text-label-sm text-tertiary">00:12 REMAINING</span>
</div>
<div className="segmented-progress">
<div className="segment segment-active"></div>
<div className="segment segment-active"></div>
<div className="segment segment-active"></div>
<div className="segment segment-active"></div>
<div className="segment segment-active"></div>
<div className="segment segment-active"></div>
<div className="segment segment-active"></div>
<div className="segment"></div>
</div>
</div>
<div className="mt-8 flex gap-4">
<button className="flex-1 py-3 bg-tertiary/10 border border-tertiary/30 text-tertiary font-label-technical text-sm hover:bg-tertiary hover:text-on-tertiary transition-all uppercase">Spectate</button>
<button className="px-4 py-3 bg-secondary/10 border border-secondary/30 text-secondary hover:bg-secondary hover:text-on-secondary transition-all">
<span className="material-symbols-outlined">payments</span>
</button>
</div>
</div>

<div className="relative bg-surface-container-highest border border-outline-variant/50 chamfer-card overflow-hidden group">
<img className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" data-alt="A cinematic close-up of a futuristic cybernetic eye glowing with purple neural networks. The background is a dense matrix of glowing digital data and sharp obsidian surfaces. Neon purple and cyan lighting dominates the scene, creating a high-energy cyberpunk aesthetic. The eye appears to be analyzing complex mathematical formulas floating in mid-air." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy5sJhq1C7X7gwcdSu24EyKW2l9-pZLu3okLc_OF540JGUja4m4foKncdviEZtN4v48j9HhBB66XNKKHVr1xpHhd7TFke3orWt74WjNkUDnR8BCVSUnznH48apaoEmRoTbXD04y8AevD_0WeimUtAepoyuTZxCHs5ODwfw0rnHtkj5XtiCa2FtIRJtvSWas6rNMJ3uxsvTt_4BnxFhBZs2L5Pn3SQ9KNZNWOFyIOM5PLRop3WC3vQ5qIydXlyp7Oaw9gLsfbonP9U" />
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-highest via-transparent to-transparent"></div>
<div className="relative h-full flex flex-col justify-end p-8">
<span className="font-label-technical text-label-sm text-primary mb-2 uppercase tracking-widest">Global Event</span>
<h3 className="font-display-lg text-headline-lg text-on-surface uppercase mb-4 leading-tight">THE PHANTOM CUP</h3>
<p className="font-body-md text-outline-variant mb-6">Register now for the largest neural competition of the quarter. Prize pool: 500 ETH.</p>
<button className="w-full py-3 bg-on-surface text-background font-label-technical font-bold uppercase tracking-tighter hover:bg-primary transition-colors">Register Entry</button>
</div>
</div>
</div>
</div>
</section>

<section className="py-24 px-margin-mobile md:px-margin-desktop overflow-hidden">
<div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-24">
<div className="relative">
<div className="absolute -top-10 -left-10 w-40 h-40 border-t-2 border-l-2 border-primary/40"></div>
<div className="absolute -bottom-10 -right-10 w-40 h-40 border-b-2 border-r-2 border-secondary/40"></div>
<img className="w-full h-[500px] object-cover grayscale brightness-50 contrast-125 border border-outline-variant/30" data-alt="High-tech server room with glowing green and purple server racks. The image is shot from a low angle, emphasizing the scale of the neural processing hardware. Floating holographic UI elements show data streams and connection points. The lighting is moody and dark, with bright neon accents highlighting the industrial design of the data center." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxcndZyO9rQ_RBUPyHf3bxUCyyWjTxBMX2DnOMqr_wrnDKAZMY7uqsORMewS8rZcn62Nc7hxQyZVOL3jnsCSvvLbAcIPbrc44gxRpSPNGO5Ld5TqDCc66UUV8jOeOL6Nd9oAt4tgTci-WJFyvJBYU7ifSdlXBAkKrX9MA2-skE2inRk14Hmb9qY4wjSzqr5uyExLiYEcRbS6tQ9w2SlHLpVfLGNHukjpdD4tp6Q8CqfI_PZdZfZ-NYfiMpfCp8SVwosZ-q7F0iQ88" />
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-xl border border-primary/50 p-6 flex flex-col gap-4">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-tertiary">bolt</span>
<span className="font-label-technical text-on-surface uppercase">Low Latency Engine</span>
</div>
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-tertiary">security</span>
<span className="font-label-technical text-on-surface uppercase">ZK-STAKE PROTOCOL</span>
</div>
</div>
</div>
<div className="space-y-8">
<h2 className="font-display-lg text-display-lg-mobile md:text-headline-xl text-on-surface uppercase">ENGINEERED FOR <span className="text-primary italic">PRECISION</span></h2>
<p className="font-body-lg text-outline-variant">
                        Our proprietary POIRO NEURAL SYSTEM leverages distributed compute to ensure lightning-fast resolution of AI challenges. Whether you're running a simple image prompt duel or a complex logic tournament, the execution is flawless.
                    </p>
<ul className="space-y-6">
<li className="flex gap-4">
<div className="mt-1 w-2 h-6 bg-primary"></div>
<div>
<h4 className="font-headline-lg text-on-surface text-lg uppercase mb-1">REAL-TIME TELEMETRY</h4>
<p className="font-body-md text-outline-variant">Watch every token being generated with full technical transparency.</p>
</div>
</li>
<li className="flex gap-4">
<div className="mt-1 w-2 h-6 bg-secondary"></div>
<div>
<h4 className="font-headline-lg text-on-surface text-lg uppercase mb-1">STAKING LIQUIDITY</h4>
<p className="font-body-md text-outline-variant">High-yield pools for spectators and operators during live battles.</p>
</div>
</li>
</ul>
</div>
</div>
</section>
</main>

<footer className="w-full mt-auto px-margin-desktop py-12 border-t border-outline-variant/10 bg-background">
<div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
<div className="flex flex-col gap-2">
<span className="text-on-surface font-black font-display-lg text-2xl tracking-tighter">POIRO</span>
<p className="font-label-sm text-label-sm tracking-tight text-outline uppercase">© 2024 POIRO NEURAL SYSTEMS. ALL RIGHTS RESERVED.</p>
</div>
<div className="flex gap-8">
<a className="font-label-sm text-label-sm tracking-tight text-outline hover:text-tertiary transition-all ease-in-out duration-150" href="#">Terms of Service</a>
<a className="font-label-sm text-label-sm tracking-tight text-outline hover:text-tertiary transition-all ease-in-out duration-150" href="#">Privacy Protocol</a>
<a className="font-label-sm text-label-sm tracking-tight text-outline hover:text-tertiary transition-all ease-in-out duration-150" href="#">API Docs</a>
<a className="font-label-sm text-label-sm tracking-tight text-outline hover:text-tertiary transition-all ease-in-out duration-150" href="#">System Status</a>
</div>
<div className="flex gap-4">
<button className="w-10 h-10 border border-outline-variant/30 flex items-center justify-center hover:bg-primary/10 transition-all">
<span className="material-symbols-outlined text-on-surface-variant">terminal</span>
</button>
<button className="w-10 h-10 border border-outline-variant/30 flex items-center justify-center hover:bg-secondary/10 transition-all">
<span className="material-symbols-outlined text-on-surface-variant">public</span>
</button>
</div>
</div>
</footer>


    </div>
  );
}
