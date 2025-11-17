import DJCTQ_L from "../ratings/DJCTQ-L.svg.png";
import DJCTQ_10 from "../ratings/DJCTQ-10.svg.png";
import DJCTQ_12 from "../ratings/DJCTQ-12.svg.png";
import DJCTQ_14 from "../ratings/DJCTQ-14.svg.png";
import DJCTQ_16 from "../ratings/DJCTQ-16.svg.png";
import DJCTQ_18 from "../ratings/DJCTQ-18.svg.png";

// Source: https://en.wikipedia.org/wiki/Brazilian_advisory_rating_system
// Source: https://www.gov.br/mj/pt-br/assuntos/seus-direitos/classificacao-1/guia-pratico/guia-pratico-de-audiovisual-3o-ed-english-version-1.pdf

export const DJCTQInfo = {
  l: {
    meaning: "General Audiences",
    img: DJCTQ_L,
    description: {
      Violence:
        "Fantasy violence; display of weapons without violence; very mild swear words; deaths without violence; slapping; fighting; bones and skeletons without violence.",
      Sex_and_Nudity: "Non-erotic or hidden nudity; kissing; farting.",
      Drug: "Moderate or suggestive use of legal drugs",
    },
  },
  10: {
    meaning: "Not recommended for minors under ten",
    img: DJCTQ_10,
    description: {
      Violence:
        "Anguish; displays of weapons with violence; fear or tension; vomiting; distress; bones and skeletons with signs of violent acts; criminal acts without violence; derogatory language; mild swear words.",
      Sex_and_Nudity: "Educational content about sex; tongue kiss.",
      Drug: "References to the use of legal drugs; discussion on the issue 'drug trafficking'; medicinal use of illegal drugs.",
    },
  },
  12: {
    meaning: "Not recommended for minors under twelve",
    img: DJCTQ_12,
    description: {
      Violence:
        "Violent act; body injury; violent references; blood presence; victim's pain or suffering; deaths with violence; animal cruelty; exposure to danger; showing people in embarrassing or degrading situations; verbal aggression; obscenity; bullying; corpses; sexual harassment; overvaluation of the physical beauty; overvaluation of consumption.",
      Sex_and_Nudity:
        "Veiled nudity; sexual innuendo; sexual fondling; genitals; masturbation; sexual arousal; coarse language; swear words used in a sexual context; sexual references; sex simulation; sexual appeal.",
      Drug: "Use of legal drugs; medication misuse; inducing the use of legal drugs; discussion on the 'decriminalization of illegal drugs'; illegal drug references.",
    },
  },
  14: {
    meaning: "Not recommended for minors under fourteen",
    img: DJCTQ_14,
    description: {
      Violence:
        "Abortion; euthanasia; sexual exploitation; intentional death; death penalty; social stigma or prejudice.",
      Sex_and_Nudity:
        "Erotization; moderate nudity; crude language; sexual intercourse; prostitution.",
      Drug: "Suggestive use of illegal drugs; references to the use or trafficking of illegal drugs",
    },
  },
  16: {
    meaning: "Not recommended for minors under sixteen",
    img: DJCTQ_16,
    description: {
      Violence:
        "Act of pedophilia; hate crime; rape; incest; sexual coercion; mutilation; sexual abuse; suicide; sexual violence; torture; gratuitous violence/trivialization of violence.",
      Sex_and_Nudity:
        "Intense sexual intercourse; strong sexual content; complete nudity.",
      Drug: "Production or trafficking of any illegal drug; use of illegal drugs; inducing the use of illegal drugs; cannabis.",
    },
  },
  18: {
    meaning: "Not recommended for minors under eighteen",
    img: DJCTQ_18,
    description: {
      Violence: "Apology to violence; extreme violence; cruelty.",
      Sex_and_Nudity:
        "Explicit sex; complex/strong impact sexual situation; violent fetishes; pornography.",
      Drug: "Apology to the use of illegal drugs.",
    },
  },
};
