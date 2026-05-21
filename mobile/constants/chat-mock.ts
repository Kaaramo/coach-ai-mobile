export type Group = 'today' | 'week' | 'older';
export type ConvId = string;

export type Conversation = {
  id: ConvId;
  title: string;
  preview: string;
  time: string;
  group: Group;
  count: number;
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
  sources?: number;
  streaming?: boolean;
};

export const CONVERSATIONS: Conversation[] = [
  { id: 'c_001', title: 'Résumé de ma journée',        preview: 'Hier (lundi 28), tu as eu une journée plus dense…',     time: '15:00',    group: 'today', count: 6 },
  { id: 'c_002', title: 'Mes habitudes de la semaine', preview: 'Tu as réduit ton temps de réunion de 18 % cette…',      time: '11:20',    group: 'today', count: 12 },
  { id: 'c_003', title: 'Réunion de lundi',            preview: '3 décisions extraites : (1) avancer la roadmap…',       time: 'lun.',     group: 'week',  count: 4 },
  { id: 'c_004', title: 'Combien de temps de code ?',  preview: 'Sur les 7 derniers jours, 18h42 en code dont 62 %…',    time: 'dim.',     group: 'week',  count: 8 },
  { id: 'c_005', title: 'Comparer avec mars',          preview: 'En mars tu codais 22 h/semaine en moyenne…',             time: '23 avr.',  group: 'older', count: 5 },
];

export const MESSAGES_BY_CONV: Record<ConvId, Message[]> = {
  c_001: [
    { id: 'm1', role: 'user',      text: "Sur quoi j'ai passé le plus de temps mardi ?", time: '14:35' },
    { id: 'm2', role: 'assistant', text: "Mardi, tu as passé 3h45 en code (matin) et 1h en réunion (après-midi). Le reste s'est réparti entre 50 minutes de pause repas et 35 minutes en transit. Pic de concentration entre 9h et 11h.", time: '14:35', sources: 3 },
    { id: 'm3', role: 'user',      text: 'Et hier ?', time: '14:36' },
    { id: 'm4', role: 'assistant', text: "Hier (lundi 28), tu as eu une journée plus dense : 5h10 de code (réparties matin + soir), 1h30 en réunion, 30 min de pause. Tu n'as pas pris de marche, alors que tu en fais en moyenne 25 min.", time: '14:37', sources: 2 },
  ],
  c_002: [
    { id: 'm1', role: 'user',      text: 'Quelles habitudes je dois améliorer ?', time: '11:18' },
    { id: 'm2', role: 'assistant', text: "Trois points ressortent cette semaine : (1) ton hydratation est en baisse : 4 verres/jour en moyenne contre 6 la semaine d'avant ; (2) tu enchaînes plus de 90 min sans pause sur 60 % de tes blocs de code ; (3) tu te couches 45 min plus tard que ta moyenne du mois.", time: '11:19', sources: 4 },
  ],
};

export const SUGGESTIONS: string[] = [
  "Résume-moi ma journée d'hier",
  'Combien de temps en réunion cette semaine ?',
  'Quelles habitudes je dois améliorer ?',
  "Sur quoi j'ai passé le plus de temps lundi ?",
];

export const GROUP_LABEL: Record<Group, string> = {
  today: "Aujourd'hui",
  week: 'Cette semaine',
  older: 'Plus ancien',
};
