// Mock data for UroCare application

export interface Patient {
  id: string
  name: string
  email: string
  surgeryType: string
  surgeryDate: string
  surgeonName: string
  postOpDay: number
  lastCheckIn: string | null
  activeAlerts: number
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
}

export interface CheckInEntry {
  id: string
  patientId: string
  date: string
  painLevel: number
  nausea: boolean
  dizziness: boolean
  fatigue: 'mild' | 'moderate' | 'severe'
  temperature: number
  heartRate?: number
  bleeding: 'none' | 'mild' | 'heavy'
  urinationProblems: 'none' | 'mild' | 'severe'
  woundConcerns: 'none' | 'redness' | 'swelling' | 'fluid'
  status: 'ok' | 'warning'
}

export interface Alert {
  id: string
  patientId: string
  patientName: string
  type: 'Fever' | 'Severe Pain' | 'Bleeding' | 'Urination Issues' | 'Wound Concern'
  severity: 'Low' | 'Medium' | 'High'
  time: string
  status: 'New' | 'Seen' | 'Handled'
  keyValues?: string
}

export interface TimelineTask {
  id: string
  title: string
  description: string
  dueDate: string
  phase: 'before' | 'surgery-day' | 'after' | 'follow-up'
  status: 'not-started' | 'in-progress' | 'done'
}

export interface Message {
  id: string
  threadId: string
  senderId: string
  senderName: string
  senderRole: 'patient' | 'clinician'
  content: string
  timestamp: string
}

export interface MessageThread {
  id: string
  patientId: string
  patientName: string
  lastMessage: string
  lastMessageTime: string
  unread: boolean
}

// Mock Patients
export const patients: Patient[] = [
  {
    id: 'p1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    surgeryType: 'Prostate Surgery',
    surgeryDate: '2026-01-22',
    surgeonName: 'Dr. Michael Chen',
    postOpDay: 4,
    lastCheckIn: '2026-01-26T09:30:00',
    activeAlerts: 0,
    emergencyContact: { name: 'John Johnson', phone: '(555) 123-4567', relationship: 'Spouse' }
  },
  {
    id: 'p2',
    name: 'Robert Williams',
    email: 'robert.w@email.com',
    surgeryType: 'Kidney Stone Removal',
    surgeryDate: '2026-01-20',
    surgeonName: 'Dr. Emily Rodriguez',
    postOpDay: 6,
    lastCheckIn: '2026-01-26T08:15:00',
    activeAlerts: 2,
    emergencyContact: { name: 'Mary Williams', phone: '(555) 234-5678', relationship: 'Spouse' }
  },
  {
    id: 'p3',
    name: 'James Martinez',
    email: 'j.martinez@email.com',
    surgeryType: 'Bladder Surgery',
    surgeryDate: '2026-01-24',
    surgeonName: 'Dr. Michael Chen',
    postOpDay: 2,
    lastCheckIn: '2026-01-25T14:00:00',
    activeAlerts: 1,
    emergencyContact: { name: 'Linda Martinez', phone: '(555) 345-6789', relationship: 'Spouse' }
  },
  {
    id: 'p4',
    name: 'Patricia Brown',
    email: 'p.brown@email.com',
    surgeryType: 'Prostate Surgery',
    surgeryDate: '2026-01-18',
    surgeonName: 'Dr. Sarah Kim',
    postOpDay: 8,
    lastCheckIn: '2026-01-26T07:45:00',
    activeAlerts: 0,
    emergencyContact: { name: 'Michael Brown', phone: '(555) 456-7890', relationship: 'Spouse' }
  },
  {
    id: 'p5',
    name: 'David Lee',
    email: 'd.lee@email.com',
    surgeryType: 'Kidney Transplant',
    surgeryDate: '2026-01-23',
    surgeonName: 'Dr. Emily Rodriguez',
    postOpDay: 3,
    lastCheckIn: null,
    activeAlerts: 1,
    emergencyContact: { name: 'Jennifer Lee', phone: '(555) 567-8901', relationship: 'Spouse' }
  },
  {
    id: 'p6',
    name: 'Linda Davis',
    email: 'l.davis@email.com',
    surgeryType: 'Bladder Surgery',
    surgeryDate: '2026-01-21',
    surgeonName: 'Dr. Michael Chen',
    postOpDay: 5,
    lastCheckIn: '2026-01-26T10:00:00',
    activeAlerts: 0,
    emergencyContact: { name: 'Thomas Davis', phone: '(555) 678-9012', relationship: 'Spouse' }
  },
  {
    id: 'p7',
    name: 'Michael Anderson',
    email: 'm.anderson@email.com',
    surgeryType: 'Prostate Surgery',
    surgeryDate: '2026-01-19',
    surgeonName: 'Dr. Sarah Kim',
    postOpDay: 7,
    lastCheckIn: '2026-01-25T16:30:00',
    activeAlerts: 3,
    emergencyContact: { name: 'Susan Anderson', phone: '(555) 789-0123', relationship: 'Spouse' }
  },
  {
    id: 'p8',
    name: 'Elizabeth Taylor',
    email: 'e.taylor@email.com',
    surgeryType: 'Kidney Stone Removal',
    surgeryDate: '2026-01-25',
    surgeonName: 'Dr. Emily Rodriguez',
    postOpDay: 1,
    lastCheckIn: '2026-01-26T11:00:00',
    activeAlerts: 0,
    emergencyContact: { name: 'Richard Taylor', phone: '(555) 890-1234', relationship: 'Spouse' }
  },
]

// Current patient (for patient portal demo)
export const currentPatient = patients[0]

// Mock Check-in entries for Sarah Johnson
export const checkInHistory: CheckInEntry[] = [
  {
    id: 'c1',
    patientId: 'p1',
    date: '2026-01-26T09:30:00',
    painLevel: 3,
    nausea: false,
    dizziness: false,
    fatigue: 'mild',
    temperature: 37.1,
    heartRate: 72,
    bleeding: 'none',
    urinationProblems: 'mild',
    woundConcerns: 'none',
    status: 'ok'
  },
  {
    id: 'c2',
    patientId: 'p1',
    date: '2026-01-25T10:15:00',
    painLevel: 4,
    nausea: true,
    dizziness: false,
    fatigue: 'moderate',
    temperature: 37.3,
    heartRate: 78,
    bleeding: 'none',
    urinationProblems: 'mild',
    woundConcerns: 'none',
    status: 'ok'
  },
  {
    id: 'c3',
    patientId: 'p1',
    date: '2026-01-24T09:00:00',
    painLevel: 5,
    nausea: true,
    dizziness: true,
    fatigue: 'moderate',
    temperature: 37.5,
    heartRate: 82,
    bleeding: 'mild',
    urinationProblems: 'mild',
    woundConcerns: 'redness',
    status: 'warning'
  },
  {
    id: 'c4',
    patientId: 'p1',
    date: '2026-01-23T08:45:00',
    painLevel: 6,
    nausea: false,
    dizziness: false,
    fatigue: 'severe',
    temperature: 37.8,
    heartRate: 88,
    bleeding: 'mild',
    urinationProblems: 'mild',
    woundConcerns: 'swelling',
    status: 'warning'
  },
]

// Mock Alerts
export const alerts: Alert[] = [
  {
    id: 'a1',
    patientId: 'p2',
    patientName: 'Robert Williams',
    type: 'Fever',
    severity: 'High',
    time: '2026-01-26T08:30:00',
    status: 'New',
    keyValues: 'Temp: 38.6°C'
  },
  {
    id: 'a2',
    patientId: 'p2',
    patientName: 'Robert Williams',
    type: 'Severe Pain',
    severity: 'Medium',
    time: '2026-01-26T08:30:00',
    status: 'New',
    keyValues: 'Pain: 8/10'
  },
  {
    id: 'a3',
    patientId: 'p3',
    patientName: 'James Martinez',
    type: 'Bleeding',
    severity: 'Medium',
    time: '2026-01-25T14:15:00',
    status: 'Seen',
    keyValues: 'Heavy bleeding'
  },
  {
    id: 'a4',
    patientId: 'p5',
    patientName: 'David Lee',
    type: 'Urination Issues',
    severity: 'Low',
    time: '2026-01-25T11:00:00',
    status: 'Handled',
    keyValues: 'Mild difficulty'
  },
  {
    id: 'a5',
    patientId: 'p7',
    patientName: 'Michael Anderson',
    type: 'Fever',
    severity: 'High',
    time: '2026-01-25T17:00:00',
    status: 'Seen',
    keyValues: 'Temp: 39.1°C'
  },
  {
    id: 'a6',
    patientId: 'p7',
    patientName: 'Michael Anderson',
    type: 'Wound Concern',
    severity: 'Medium',
    time: '2026-01-25T17:00:00',
    status: 'New',
    keyValues: 'Fluid discharge'
  },
  {
    id: 'a7',
    patientId: 'p7',
    patientName: 'Michael Anderson',
    type: 'Severe Pain',
    severity: 'High',
    time: '2026-01-25T16:45:00',
    status: 'New',
    keyValues: 'Pain: 9/10'
  },
]

// Mock Timeline Tasks for patient
export const timelineTasks: TimelineTask[] = [
  // Before surgery
  {
    id: 't1',
    title: 'Pre-operative consultation',
    description: 'Meet with your surgeon to discuss the procedure and ask questions.',
    dueDate: '2026-01-15',
    phase: 'before',
    status: 'done'
  },
  {
    id: 't2',
    title: 'Complete blood work',
    description: 'Visit the lab to complete required blood tests.',
    dueDate: '2026-01-18',
    phase: 'before',
    status: 'done'
  },
  {
    id: 't3',
    title: 'Stop blood thinners',
    description: 'Stop taking aspirin and other blood thinners as directed.',
    dueDate: '2026-01-19',
    phase: 'before',
    status: 'done'
  },
  {
    id: 't4',
    title: 'Pre-op fasting',
    description: 'No food or drink after midnight before surgery.',
    dueDate: '2026-01-21',
    phase: 'before',
    status: 'done'
  },
  // Surgery day
  {
    id: 't5',
    title: 'Arrive at hospital',
    description: 'Check in at the surgical center 2 hours before procedure.',
    dueDate: '2026-01-22',
    phase: 'surgery-day',
    status: 'done'
  },
  {
    id: 't6',
    title: 'Surgery complete',
    description: 'Procedure performed successfully.',
    dueDate: '2026-01-22',
    phase: 'surgery-day',
    status: 'done'
  },
  // After surgery
  {
    id: 't7',
    title: 'Begin walking',
    description: 'Start short walks to prevent blood clots.',
    dueDate: '2026-01-23',
    phase: 'after',
    status: 'done'
  },
  {
    id: 't8',
    title: 'Start pain medication schedule',
    description: 'Take medications as prescribed every 6 hours.',
    dueDate: '2026-01-23',
    phase: 'after',
    status: 'done'
  },
  {
    id: 't9',
    title: 'Daily check-in',
    description: 'Complete your daily symptom check-in.',
    dueDate: '2026-01-26',
    phase: 'after',
    status: 'in-progress'
  },
  {
    id: 't10',
    title: 'Wound care',
    description: 'Clean and dress the surgical site as instructed.',
    dueDate: '2026-01-26',
    phase: 'after',
    status: 'not-started'
  },
  {
    id: 't11',
    title: 'Increase activity',
    description: 'Gradually increase walking distance.',
    dueDate: '2026-01-28',
    phase: 'after',
    status: 'not-started'
  },
  // Follow-up
  {
    id: 't12',
    title: 'First follow-up appointment',
    description: 'Visit Dr. Chen for post-operative examination.',
    dueDate: '2026-01-29',
    phase: 'follow-up',
    status: 'not-started'
  },
  {
    id: 't13',
    title: 'Remove catheter',
    description: 'Scheduled catheter removal at clinic.',
    dueDate: '2026-02-01',
    phase: 'follow-up',
    status: 'not-started'
  },
  {
    id: 't14',
    title: 'Resume normal diet',
    description: 'Gradually return to regular eating habits.',
    dueDate: '2026-02-05',
    phase: 'follow-up',
    status: 'not-started'
  },
]

// Mock Messages
export const messageThreads: MessageThread[] = [
  {
    id: 'thread1',
    patientId: 'p1',
    patientName: 'Sarah Johnson',
    lastMessage: 'Thank you for the update!',
    lastMessageTime: '2026-01-26T10:30:00',
    unread: false
  },
  {
    id: 'thread2',
    patientId: 'p2',
    patientName: 'Robert Williams',
    lastMessage: 'My temperature is still high, should I be concerned?',
    lastMessageTime: '2026-01-26T08:45:00',
    unread: true
  },
  {
    id: 'thread3',
    patientId: 'p3',
    patientName: 'James Martinez',
    lastMessage: 'The bleeding has reduced since yesterday.',
    lastMessageTime: '2026-01-25T15:20:00',
    unread: false
  },
  {
    id: 'thread4',
    patientId: 'p7',
    patientName: 'Michael Anderson',
    lastMessage: 'I need to speak with someone urgently.',
    lastMessageTime: '2026-01-25T17:30:00',
    unread: true
  },
]

export const messages: Message[] = [
  {
    id: 'm1',
    threadId: 'thread1',
    senderId: 'clinician1',
    senderName: 'Dr. Chen\'s Office',
    senderRole: 'clinician',
    content: 'Hi Sarah, your check-in results look good. Keep up with your recovery routine!',
    timestamp: '2026-01-26T10:00:00'
  },
  {
    id: 'm2',
    threadId: 'thread1',
    senderId: 'p1',
    senderName: 'Sarah Johnson',
    senderRole: 'patient',
    content: 'Thank you for the update!',
    timestamp: '2026-01-26T10:30:00'
  },
  {
    id: 'm3',
    threadId: 'thread1',
    senderId: 'clinician1',
    senderName: 'Dr. Chen\'s Office',
    senderRole: 'clinician',
    content: 'Hello Sarah, how are you feeling today? Don\'t forget to complete your daily check-in.',
    timestamp: '2026-01-25T09:00:00'
  },
  {
    id: 'm4',
    threadId: 'thread1',
    senderId: 'p1',
    senderName: 'Sarah Johnson',
    senderRole: 'patient',
    content: 'I\'m feeling better than yesterday. The pain is manageable with medication.',
    timestamp: '2026-01-25T09:30:00'
  },
]

// Quick message templates for clinicians
export const messageTemplates = [
  'Please monitor your temperature and report any increases.',
  'Remember to take your medications as prescribed.',
  'If symptoms persist, please contact us immediately.',
  'Your check-in looks good. Continue with your recovery plan.',
  'Please schedule a follow-up appointment at your earliest convenience.',
]

// Stats for clinician dashboard
export const clinicianStats = {
  alertsToday: 4,
  patientsCheckingInToday: 6,
  highRiskPatients: 2,
  unreadMessages: 3,
}
