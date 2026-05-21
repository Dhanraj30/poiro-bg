import { Link, useNavigate } from 'react-router-dom';

export function LobbyPageNew() {
  const navigate = useNavigate();
  return (
    <div className="bg-background font-body-md text-on-background selection:bg-primary selection:text-on-primary">
      

<header className="fixed top-0 w-full flex justify-between items-center px-margin-desktop h-16 bg-background/80 backdrop-blur-xl z-50 border-b border-outline-variant/30 shadow-[0_0_20px_rgba(236,186,255,0.15)]">
<div className="flex items-center gap-8">
<span className="font-display-lg text-headline-lg font-black tracking-tighter text-primary italic">POIRO</span>
<nav className="hidden md:flex gap-6">
<a className="font-label-technical text-label-technical uppercase tracking-widest text-primary border-b-2 border-primary pb-1 transition-all duration-200 active:scale-95" href="#">Arena</a>
<a className="font-label-technical text-label-technical uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors hover:bg-primary/10 transition-all duration-200 active:scale-95" href="#">Lobby</a>
<a className="font-label-technical text-label-technical uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors hover:bg-primary/10 transition-all duration-200 active:scale-95" href="#">Rankings</a>
<a className="font-label-technical text-label-technical uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors hover:bg-primary/10 transition-all duration-200 active:scale-95" href="#">Lab</a>
</nav>
</div>
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">notifications</button>
<button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">bolt</button>
<button className="bg-primary text-on-primary px-6 py-2 font-label-technical text-label-sm uppercase font-bold tech-corner transition-all hover:glow-primary active:scale-95">Connect Wallet</button>
</div>
</header>

<aside className="hidden lg:flex flex-col fixed left-0 top-16 h-[calc(100vh-64px)] bg-surface-container-lowest/90 backdrop-blur-2xl border-r border-outline-variant/20 w-64 z-40">
<div className="p-6 border-b border-outline-variant/10">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-primary/20 border border-primary/40 flex items-center justify-center tech-corner overflow-hidden">
<img alt="Elite Pilot Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzIJDM2saQhsU2ghuI_1qKMFp_kAZ06cVr6zWhGy_6AxvGQwlRee2A1OIhRmHHPlKCkr_YF-RupxiouEjT5iMIStJSpB882MATbm1vlSpXemQawYxnxSBYKnl8BkavCZOSb-_z1c14VbsaqDNRCRVuWncg9TfYgEDX0eASeOSKnNqlaubiEiBgV9OeEB9lGXCMx4SET22S7QHjwdRuiR309nomwz8PKC8dQj4TQGsF2UEj7M6roxhWRjYEL5_CyYf1kYS50MXJj2M" />
</div>
<div>
<h3 className="font-label-technical text-primary text-label-sm leading-tight">OPERATOR_01</h3>
<p className="font-label-technical text-outline text-[10px] tracking-widest">RANK: PHANTOM</p>
</div>
</div>
</div>
<nav className="flex-1 py-4 overflow-y-auto">
<div className="px-3 mb-2">
<button className="w-full py-3 bg-secondary/10 text-secondary border-r-4 border-secondary flex items-center gap-3 px-4 transition-transform duration-300 ease-in-out hover:glow-secondary">
<span className="material-symbols-outlined" style={{ fontVariationSettings: ''FILL' 1' }}>swords</span>
<span className="font-label-technical text-label-sm uppercase tracking-wider">Live Battles</span>
</button>
</div>
<div className="px-3 mb-2">
<button className="w-full py-3 text-outline hover:text-on-surface hover:bg-white/5 flex items-center gap-3 px-4 transition-transform duration-300 ease-in-out">
<span className="material-symbols-outlined">terminal</span>
<span className="font-label-technical text-label-sm uppercase tracking-wider">My Prompts</span>
</button>
</div>
<div className="px-3 mb-2">
<button className="w-full py-3 text-outline hover:text-on-surface hover:bg-white/5 flex items-center gap-3 px-4 transition-transform duration-300 ease-in-out">
<span className="material-symbols-outlined">payments</span>
<span className="font-label-technical text-label-sm uppercase tracking-wider">Stakes</span>
</button>
</div>
<div className="px-3 mb-2">
<button className="w-full py-3 text-outline hover:text-on-surface hover:bg-white/5 flex items-center gap-3 px-4 transition-transform duration-300 ease-in-out">
<span className="material-symbols-outlined">shield</span>
<span className="font-label-technical text-label-sm uppercase tracking-wider">Armory</span>
</button>
</div>
<div className="px-3 mb-2">
<button className="w-full py-3 text-outline hover:text-on-surface hover:bg-white/5 flex items-center gap-3 px-4 transition-transform duration-300 ease-in-out">
<span className="material-symbols-outlined">settings</span>
<span className="font-label-technical text-label-sm uppercase tracking-wider">Settings</span>
</button>
</div>
</nav>
<div className="mt-auto p-4 border-t border-outline-variant/10">
<button className="w-full py-3 border border-secondary text-secondary font-label-technical text-label-sm uppercase tracking-widest tech-corner hover:bg-secondary/10 transition-colors mb-4">
                NEW BATTLE
            </button>
<div className="flex justify-around text-outline">
<button className="hover:text-tertiary flex items-center gap-1 transition-colors">
<span className="material-symbols-outlined text-[18px]">help</span>
<span className="font-label-technical text-[10px]">Support</span>
</button>
<button className="hover:text-tertiary flex items-center gap-1 transition-colors">
<span className="material-symbols-outlined text-[18px]">menu_book</span>
<span className="font-label-technical text-[10px]">Logs</span>
</button>
</div>
</div>
</aside>

<main className="lg:ml-64 pt-24 pb-12 px-margin-mobile md:px-margin-desktop min-h-screen">
<div className="max-w-container-max mx-auto">
<div className="flex flex-col lg:flex-row gap-8">

<div className="flex-1">
<div className="flex items-center justify-between mb-8">
<div className="flex flex-col">
<h1 className="font-headline-xl text-headline-xl text-primary tracking-tight">ACTIVE_LOBBY</h1>
<p className="font-label-technical text-on-surface-variant text-label-sm opacity-60">SCANNING FOR HIGH-STAKES INSTANCES...</p>
</div>
<div className="flex gap-2">
<span className="bg-tertiary/10 text-tertiary border border-tertiary/30 px-3 py-1 font-label-technical text-[10px] uppercase">Servers: Optimal</span>
<span className="bg-secondary/10 text-secondary border border-secondary/30 px-3 py-1 font-label-technical text-[10px] uppercase">Latency: 12ms</span>
</div>
</div>

<div className="flex gap-4 mb-8 overflow-x-auto pb-2">
<button className="px-6 py-2 bg-primary text-on-primary font-label-technical text-label-sm uppercase tech-corner">All Battles</button>
<button className="px-6 py-2 border border-outline-variant/30 text-outline-variant font-label-technical text-label-sm uppercase tech-corner hover:border-primary hover:text-primary">High Stakes</button>
<button className="px-6 py-2 border border-outline-variant/30 text-outline-variant font-label-technical text-label-sm uppercase tech-corner hover:border-primary hover:text-primary">Beginner</button>
<button className="px-6 py-2 border border-outline-variant/30 text-outline-variant font-label-technical text-label-sm uppercase tech-corner hover:border-primary hover:text-primary">Tournament</button>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="glass-panel relative overflow-hidden group hover:glow-primary transition-all duration-300">
<div className="scanline"></div>
<div className="aspect-video w-full overflow-hidden bg-surface-container relative">
<img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100 scale-110 group-hover:scale-100" data-alt="A cinematic wide-angle shot of a sprawling neon-lit cyberpunk city at night with towering skyscrapers reflecting on wet asphalt streets. The color palette is dominated by deep obsidians and vibrant magentas, creating a high-contrast futuristic atmosphere. Volumetric fog and glowing holographic advertisements fill the air between buildings, capturing the essence of a tech-heavy dystopian metropolis." src="https://lh3.googleusercontent.com/aida-public/AB6AXuArDhQ2hmRvQtSkj5UebqceKwm-eCNoe-hNWF2VKn2slu19z0oViJAjQ45WUKXsFoNym2Ke60_KrCvZ5n5zkXQX4nKWCtIW_uvAC5jRNfE23f6rzZ6YoYmdglCtXUU17fhYp8_zZe-Ig1iAB9-WMjg_Pnt6pSgmIJdCYUH9KNV_MGMHUbtTZZ6sk7foDWGJ1eFHd-bP-uZC3eOlsDg7Q5_T7VOojEvRgSee_U5GKbhuAEzHKXYMFpJ1bZCrN6CyHye3UzenNuaDRYE" />
<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
<div className="absolute top-4 left-4">
<span className="bg-secondary text-on-secondary-container px-3 py-1 font-label-technical text-[10px] font-bold uppercase tech-corner">LIVE</span>
</div>
<div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
<div>
<p className="font-label-technical text-[10px] text-outline mb-1 uppercase tracking-widest">Host: VECTOR_ARC</p>
<h2 className="font-headline-lg text-headline-lg text-on-surface leading-none uppercase">Cyberpunk Cityscapes</h2>
</div>
<div className="text-right">
<p className="font-label-technical text-secondary text-headline-lg font-black leading-none">50<span className="text-label-sm">CR</span></p>
</div>
</div>
</div>
<div className="p-6">
<div className="flex items-center justify-between mb-4">
<div className="flex flex-col">
<span className="text-outline font-label-technical text-[10px] uppercase">Current Load</span>
<div className="flex items-center gap-2">
<div className="flex gap-1">
<div className="w-1 h-3 bg-secondary"></div>
<div className="w-1 h-3 bg-secondary"></div>
<div className="w-1 h-3 bg-secondary"></div>
<div className="w-1 h-3 bg-secondary"></div>
<div className="w-1 h-3 bg-outline-variant/30"></div>
</div>
<span className="font-label-technical text-label-sm text-secondary">8/12 Players</span>
</div>
</div>
<button className="bg-primary/20 border border-primary text-primary px-8 py-2 font-label-technical text-label-sm uppercase tech-corner hover:bg-primary hover:text-on-primary transition-all active:scale-95">JOIN_INST</button>
</div>
</div>
</div>

<div className="glass-panel relative overflow-hidden group hover:glow-primary transition-all duration-300">
<div className="aspect-video w-full overflow-hidden bg-surface-container relative">
<img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100 scale-110 group-hover:scale-100" data-alt="An abstract visualization of deep space cosmic energy featuring swirling nebulae in deep emerald greens and electric blues. Brilliant stars and distant galaxies are scattered across a matte black void, creating an atmosphere of vastness and celestial wonder. The lighting is ethereal and glowy, with soft transitions between intense color bursts and infinite darkness, representing a high-energy creative frontier." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4kmZtzQeerSAL2GF2AvDLasoOP2zQKQadhs9zJDTL_R-G3l8fPjm_Ku8-OO0IQyjbxiO62hqcju1opiAJxCJZY0CZxTRDBm6YHjbFgAPsIuk4ldlIii1kFoU9MDQt4rVhfsTvQrPt4Ux72aqCug2uokLX_Z2IUVSeJg2s-4PPN--ATAXFYljVC7gJcmNGFLezS4NP7Jl6eEO1eEYCmrc_qwByqnzLF4GpNUuB0XwWJX5JqpQXdQs1ljRNiCaJ3ZDEbDPC2fpGZ5o" />
<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
<div className="absolute top-4 left-4">
<span className="bg-primary text-on-primary px-3 py-1 font-label-technical text-[10px] font-bold uppercase tech-corner">PREPARING</span>
</div>
<div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
<div>
<p className="font-label-technical text-[10px] text-outline mb-1 uppercase tracking-widest">Host: NEURAL_MIND</p>
<h2 className="font-headline-lg text-headline-lg text-on-surface leading-none uppercase">Cosmic Frontiers</h2>
</div>
<div className="text-right">
<p className="font-label-technical text-secondary text-headline-lg font-black leading-none">120<span className="text-label-sm">CR</span></p>
</div>
</div>
</div>
<div className="p-6">
<div className="flex items-center justify-between mb-4">
<div className="flex flex-col">
<span className="text-outline font-label-technical text-[10px] uppercase">Current Load</span>
<div className="flex items-center gap-2">
<div className="flex gap-1">
<div className="w-1 h-3 bg-secondary"></div>
<div className="w-1 h-3 bg-secondary"></div>
<div className="w-1 h-3 bg-outline-variant/30"></div>
<div className="w-1 h-3 bg-outline-variant/30"></div>
<div className="w-1 h-3 bg-outline-variant/30"></div>
</div>
<span className="font-label-technical text-label-sm text-secondary">4/16 Players</span>
</div>
</div>
<button className="bg-primary/20 border border-primary text-primary px-8 py-2 font-label-technical text-label-sm uppercase tech-corner hover:bg-primary hover:text-on-primary transition-all active:scale-95">RESERVE_SLOT</button>
</div>
</div>
</div>

<div className="glass-panel relative overflow-hidden group hover:glow-primary transition-all duration-300">
<div className="aspect-video w-full overflow-hidden bg-surface-container relative">
<img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100 scale-110 group-hover:scale-100" data-alt="A macro studio shot of liquid metal droplets suspended in mid-air, refracting colorful neon lights from an unseen source. The textures are incredibly smooth and reflective, with a mirror-like finish that shows hints of primary and tertiary accent colors. The lighting is precise and dramatic, casting sharp highlights and deep shadows that emphasize the organic yet metallic forms of the fluid, creating a technical and avant-garde aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgtUI36DXdITOR6Jrd_WY0Qwpm0f0_mFv6V8d_m38DQUAzHoN4pKlvPXKT2mAp72AUXxSLAG2Ao5iQUHCG2j8uaikMT3oZWjIDh0wCtPPlzXNyn5gkzrnZQXReG1zkSSx9mRBkF9jp-Vzyp4bofAznfgg6c5R1jzXNsKfoLGyqIGgbkl3d_ad6VuJQd3x3mIoE40Gb7wrk-NefQZlHLDeo2eD77sGOdHTIipVraw5YibjZpCszmClNBfz5tcsx0-5tKVjAOpIn33Q" />
<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
<div className="absolute top-4 left-4">
<span className="bg-tertiary text-on-tertiary px-3 py-1 font-label-technical text-[10px] font-bold uppercase tech-corner">TOURNAMENT</span>
</div>
<div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
<div>
<p className="font-label-technical text-[10px] text-outline mb-1 uppercase tracking-widest">Host: POIRO_OFFICIAL</p>
<h2 className="font-headline-lg text-headline-lg text-on-surface leading-none uppercase">Liquid Metal Flow</h2>
</div>
<div className="text-right">
<p className="font-label-technical text-secondary text-headline-lg font-black leading-none">500<span className="text-label-sm">CR</span></p>
</div>
</div>
</div>
<div className="p-6">
<div className="flex items-center justify-between mb-4">
<div className="flex flex-col">
<span className="text-outline font-label-technical text-[10px] uppercase">Current Load</span>
<div className="flex items-center gap-2">
<div className="flex gap-1">
<div className="w-1 h-3 bg-secondary"></div>
<div className="w-1 h-3 bg-secondary"></div>
<div className="w-1 h-3 bg-secondary"></div>
<div className="w-1 h-3 bg-secondary"></div>
<div className="w-1 h-3 bg-secondary"></div>
</div>
<span className="font-label-technical text-label-sm text-secondary">32/32 Full</span>
</div>
</div>
<button className="bg-outline-variant/20 border border-outline-variant/30 text-outline px-8 py-2 font-label-technical text-label-sm uppercase tech-corner cursor-not-allowed">SPECTATE</button>
</div>
</div>
</div>

<div className="glass-panel relative overflow-hidden group hover:glow-primary transition-all duration-300">
<div className="aspect-video w-full overflow-hidden bg-surface-container relative">
<img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100 scale-110 group-hover:scale-100" data-alt="A vintage computer workspace from the 1980s re-imagined with high-tech glowing components and fiber-optic cables. An old cathode-ray tube monitor displays green monochromatic text codes while surrounded by modern luminous gas accents in teal and lime green. The setting is cluttered with technological artifacts and circuit boards, blending retro-futuristic nostalgia with clean industrial design and sharp precision lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfV4BvvQJNmIykVWv8C7vt2uXEvaxrE8DZRMLkZgJNYPRt4CeM1SmmdLeWEHzG9HF24rHbBXn_cB-tA-ufMgxj1HQeRSFKxdoeg5uob9MTXGatcsMxRWr5l8E8xrx3GT-6cvBTI5ATqXknlct8ytJgfOOZC7mJjF1Gbxbm0H47UeZQJoGGMlothAfz0LzyfG5EW7_p0_Uk2SusBZpmmHYFtR76M34SF6Hv3j7W9JulrZ0DNNewwfj0jAtcQeHjrKCgCYwezTy5e04" />
<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
<div className="absolute top-4 left-4">
<span className="bg-secondary text-on-secondary-container px-3 py-1 font-label-technical text-[10px] font-bold uppercase tech-corner">LIVE</span>
</div>
<div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
<div>
<p className="font-label-technical text-[10px] text-outline mb-1 uppercase tracking-widest">Host: RETRO_GLITCH</p>
<h2 className="font-headline-lg text-headline-lg text-on-surface leading-none uppercase">Analog Dystopia</h2>
</div>
<div className="text-right">
<p className="font-label-technical text-secondary text-headline-lg font-black leading-none">25<span className="text-label-sm">CR</span></p>
</div>
</div>
</div>
<div className="p-6">
<div className="flex items-center justify-between mb-4">
<div className="flex flex-col">
<span className="text-outline font-label-technical text-[10px] uppercase">Current Load</span>
<div className="flex items-center gap-2">
<div className="flex gap-1">
<div className="w-1 h-3 bg-secondary"></div>
<div className="w-1 h-3 bg-outline-variant/30"></div>
<div className="w-1 h-3 bg-outline-variant/30"></div>
<div className="w-1 h-3 bg-outline-variant/30"></div>
<div className="w-1 h-3 bg-outline-variant/30"></div>
</div>
<span className="font-label-technical text-label-sm text-secondary">2/8 Players</span>
</div>
</div>
<button className="bg-primary/20 border border-primary text-primary px-8 py-2 font-label-technical text-label-sm uppercase tech-corner hover:bg-primary hover:text-on-primary transition-all active:scale-95">JOIN_INST</button>
</div>
</div>
</div>
</div>
</div>

<aside className="w-full lg:w-80">
<div className="glass-panel p-8 sticky top-24">
<div className="flex flex-col items-center mb-10">
<div className="relative w-24 h-24 mb-6">
<div className="absolute inset-0 border-2 border-primary border-t-transparent animate-spin duration-[3s] rounded-full"></div>
<div className="absolute inset-2 border-2 border-secondary border-b-transparent animate-spin-reverse duration-[2s] rounded-full"></div>
<div className="absolute inset-0 bg-primary/10 tech-corner overflow-hidden flex items-center justify-center m-3">
<img alt="Elite Pilot Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDWImhlq67rQaDPwm71SdRuGGm1bM0cPWtxCsHcu3-RJSLXjFH0PzFFAVOsYarGbz0JP-y6UP2Qt26-5Mj73WTP93ndqE_OvYi297t5QkXJKkWJyXlDGi5o9GnuFe4fRE3ykybNx7dWtZOEGRY9pV23vhB6_C51H-GanVr1PbahwssUhvGPbt9wb8W8pQgHYLzmglXUA52-dyBu2HOsLagQEpB7OqepoJwMstsAzJBgI4lF7uxp_ZpsTl5r_9ISFAp08cSgPTwJvE" />
</div>
</div>
<h2 className="font-headline-lg text-on-surface uppercase tracking-tight">OPERATOR_01</h2>
<p className="font-label-technical text-primary text-label-sm">LEVEL 44 // ELITE</p>
</div>
<div className="space-y-6">

<div className="flex flex-col border-b border-outline-variant/10 pb-4">
<span className="text-outline font-label-technical text-[10px] uppercase tracking-widest mb-1">Global Standing</span>
<div className="flex items-end justify-between">
<span className="font-headline-lg text-on-surface leading-none">#1,244</span>
<span className="text-tertiary font-label-technical text-label-sm">+12 Today</span>
</div>
</div>

<div className="flex flex-col border-b border-outline-variant/10 pb-4">
<span className="text-outline font-label-technical text-[10px] uppercase tracking-widest mb-1">Combat History</span>
<div className="flex items-end justify-between">
<div className="flex items-baseline gap-2">
<span className="font-headline-lg text-on-surface leading-none">142</span>
<span className="text-outline text-label-sm">WINS</span>
</div>
<span className="font-label-technical text-label-sm text-on-surface opacity-60">68% WR</span>
</div>
<div className="w-full h-1 bg-surface-container-highest mt-3 overflow-hidden">
<div className="h-full bg-primary" style={{ width: '68%' }}></div>
</div>
</div>

<div className="flex flex-col">
<span className="text-outline font-label-technical text-[10px] uppercase tracking-widest mb-1">Available Credits</span>
<div className="flex items-end justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: ''FILL' 1' }}>payments</span>
<span className="font-headline-lg text-secondary leading-none">12,850</span>
</div>
<button className="bg-secondary/10 hover:bg-secondary/20 p-1 tech-corner transition-colors">
<span className="material-symbols-outlined text-secondary text-[20px]">add</span>
</button>
</div>
</div>

<div className="pt-4">
<span className="text-outline font-label-technical text-[10px] uppercase tracking-widest mb-3 block">Recent Honors</span>
<div className="flex gap-3">
<div className="w-10 h-10 bg-surface-container flex items-center justify-center border border-outline-variant/30 hover:border-primary transition-colors cursor-help" title="Early Adopter">
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">verified</span>
</div>
<div className="w-10 h-10 bg-surface-container flex items-center justify-center border border-outline-variant/30 hover:border-primary transition-colors cursor-help" title="10-Win Streak">
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">military_tech</span>
</div>
<div className="w-10 h-10 bg-surface-container flex items-center justify-center border border-outline-variant/30 hover:border-primary transition-colors cursor-help" title="Top 1% Architect">
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">architecture</span>
</div>
</div>
</div>
</div>
<button className="w-full mt-10 bg-primary text-on-primary font-label-technical text-label-sm py-4 uppercase font-bold tech-corner hover:glow-primary transition-all active:scale-95">
                            VIEW_DETAILED_REPORTS
                        </button>
</div>
</aside>
</div>
</div>
</main>

<footer className="w-full mt-auto px-margin-desktop border-t border-outline-variant/10 py-12 bg-background flex flex-col md:flex-row justify-between items-center gap-8">
<div className="flex flex-col items-center md:items-start">
<span className="text-on-surface font-black font-display-lg text-headline-lg italic">POIRO</span>
<p className="font-label-technical text-label-sm tracking-tight text-outline mt-2">© 2024 POIRO NEURAL SYSTEMS. ALL RIGHTS RESERVED.</p>
</div>
<div className="flex gap-8">
<a className="font-label-technical text-label-sm tracking-tight text-outline hover:text-tertiary transition-colors" href="#">Terms of Service</a>
<a className="font-label-technical text-label-sm tracking-tight text-outline hover:text-tertiary transition-colors" href="#">Privacy Protocol</a>
<a className="font-label-technical text-label-sm tracking-tight text-outline hover:text-tertiary transition-colors" href="#">API Docs</a>
<a className="font-label-technical text-label-sm tracking-tight text-outline hover:text-tertiary transition-colors" href="#">System Status</a>
</div>
</footer>


    </div>
  );
}
