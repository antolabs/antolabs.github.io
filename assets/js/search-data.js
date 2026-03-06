// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-",
    title: "",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publication-scie",
          title: "Publication (SCIE)",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "Click on each project card for more details.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "projects-3d-printable-dc-electromagnetic-pump",
          title: '3D Printable DC Electromagnetic Pump',
          description: "Novel DfAM design with multiple Lorentz forces for liquid metal circulation",
          section: "Projects",handler: () => {
              window.location.href = "/projects/em_01_3d_printable_emp/";
            },},{id: "projects-raon-charge-stripper-development",
          title: 'RAON Charge Stripper Development',
          description: "Lightweight helical EM thruster for liquid lithium film formation in heavy-ion accelerator",
          section: "Projects",handler: () => {
              window.location.href = "/projects/em_02_raon_charge_stripper/";
            },},{id: "projects-other-designs",
          title: 'Other Designs',
          description: "DC electromagnetic pump designs for sodium fast reactors and heavy-ion accelerators, and MHD generator analysis for power generation",
          section: "Projects",handler: () => {
              window.location.href = "/projects/em_99_other/";
            },},{id: "projects-komac-linac-ai-anomaly-detection",
          title: 'KOMAC LINAC AI Anomaly Detection',
          description: "LSTM Autoencoder for proactive fault detection in Drift Tube Quadrupole magnets",
          section: "Projects",handler: () => {
              window.location.href = "/projects/ot_01_komac_linac/";
            },},{id: "projects-frib-beam-dump-ai-design-optimization",
          title: 'FRIB Beam Dump AI Design Optimization',
          description: "Hybrid GA + Reinforcement Learning optimization for 50 kW power upgrade",
          section: "Projects",handler: () => {
              window.location.href = "/projects/tf_01_frib_beam_dump/";
            },},{id: "projects-smr-heat-exchanger-ai-topology-optimization",
          title: 'SMR Heat Exchanger AI Topology Optimization',
          description: "Deep RL + Topology optimization for PCHE design with 3D printing validation",
          section: "Projects",handler: () => {
              window.location.href = "/projects/tf_02_smr_heat_exchanger/";
            },},{id: "projects-oled-display-ai-flow-channel-generation",
          title: 'OLED Display AI Flow Channel Generation',
          description: "PPO Reinforcement Learning for susceptor heat exchanger design in CVD manufacturing",
          section: "Projects",handler: () => {
              window.location.href = "/projects/tf_03_oled_display/";
            },},{id: "projects-other-designs",
          title: 'Other Designs',
          description: "Thermal-structural analysis projects including rotating beam dump, post-target shielding, plasma chamber, and target systems at FRIB",
          section: "Projects",handler: () => {
              window.location.href = "/projects/tf_99_other/";
            },},{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/geunhyeong-lee-31a9842a4", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0003-3141-4663", "_blank");
        },
      },{
        id: 'social-researchgate',
        title: 'ResearchGate',
        section: 'Socials',
        handler: () => {
          window.open("https://www.researchgate.net/profile/Geunhyeong-Lee-3/", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=YPq9l98AAAAJ", "_blank");
        },
      },{
        id: 'social-scopus',
        title: 'Scopus',
        section: 'Socials',
        handler: () => {
          window.open("https://www.scopus.com/authid/detail.uri?authorId=56779304800", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
