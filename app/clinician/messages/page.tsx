"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MessageSquare,
  Send,
  Search,
  User,
  Stethoscope,
  ChevronDown,
} from "lucide-react"
import { messageTemplates } from "@/lib/mock-data"
import { MessageService, Thread, Message } from "@/lib/message-service"

export default function ClinicianMessages() {
  const [threads, setThreads] = useState<Thread[]>([])
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Load threads
  useEffect(() => {
    const loadThreads = () => {
      const t = MessageService.getThreads();
      setThreads(t);
      // Select first if none selected
      if (!selectedThread && t.length > 0) {
        setSelectedThread(t[0]);
      }
    };
    loadThreads();
    // Poll threads for new unread status updates
    const interval = setInterval(loadThreads, 2000);
    return () => clearInterval(interval);
  }, []);

  // Poll for messages
  useEffect(() => {
    if (!selectedThread) return;

    const loadMessages = () => {
      const msgs = MessageService.getMessages(selectedThread.id);
      setMessages(msgs);
    };

    loadMessages();
    const interval = setInterval(loadMessages, 1000); // Poll every second for live feel
    return () => clearInterval(interval);
  }, [selectedThread]);


  const filteredThreads = threads.filter(thread =>
    thread.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedThread) {
      MessageService.sendMessage(selectedThread.id, 'clinician', newMessage);
      setNewMessage("");
      // Force immediate reload
      setMessages(MessageService.getMessages(selectedThread.id));
    }
  }

  const handleTemplateSelect = (template: string) => {
    setNewMessage(template)
  }

  const unreadCount = threads.filter(t => t.unread).length

  return (
    <div className="p-4 md:p-6 lg:p-8 h-[calc(100vh-64px)] lg:h-screen flex flex-col max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Messages</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread conversations` : 'Communicate with patients'}
          </p>
        </div>
      </div>

      {/* Messages Layout */}
      <div className="flex-1 grid gap-4 lg:grid-cols-[320px_1fr] min-h-0">
        {/* Thread List */}
        <Card className="hidden lg:flex flex-col">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-2 space-y-1">
                {filteredThreads.map((thread) => (
                  <button
                    key={thread.id}
                    onClick={() => setSelectedThread(thread)}
                    className={`w-full flex items-start gap-3 rounded-lg p-3 text-left transition-colors ${selectedThread?.id === thread.id
                      ? 'bg-primary/10'
                      : 'hover:bg-muted'
                      }`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {thread.patientName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`font-medium truncate ${thread.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {thread.patientName}
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(thread.lastMessageTime).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className={`text-sm truncate ${thread.unread ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                        {thread.lastMessage}
                      </p>
                    </div>
                    {thread.unread && (
                      <div className="h-2.5 w-2.5 rounded-full bg-primary mt-1.5" />
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="flex flex-col min-h-0">
          {selectedThread ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedThread.patientName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-base text-foreground">{selectedThread.patientName}</CardTitle>
                    <p className="text-sm text-muted-foreground">Patient</p>
                  </div>
                  {selectedThread.unread && (
                    <Badge variant="secondary">New message</Badge>
                  )}
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {messages.map((message) => {
                      const isClinician = message.senderRole === 'clinician'
                      return (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${isClinician ? 'flex-row-reverse' : ''}`}
                        >
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isClinician ? 'bg-primary' : 'bg-primary/10'
                            }`}>
                            {isClinician ? (
                              <Stethoscope className="h-4 w-4 text-primary-foreground" />
                            ) : (
                              <User className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div className={`flex flex-col max-w-[70%] ${isClinician ? 'items-end' : ''}`}>
                            <div className={`rounded-lg p-3 ${isClinician
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                              }`}>
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <span className="text-xs text-muted-foreground mt-1">
                              {new Date(message.timestamp).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="border-t border-border p-4">
                <div className="flex gap-2 mb-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Templates
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-80">
                      {messageTemplates.map((template, index) => (
                        <DropdownMenuItem
                          key={index}
                          onClick={() => handleTemplateSelect(template)}
                          className="text-sm"
                        >
                          {template}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a conversation to view messages</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
