"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageSquare,
  Send,
  Plus,
  Search,
  User,
  Stethoscope,
} from "lucide-react"
import { MessageService, Thread, Message } from "@/lib/message-service"
import { currentPatient } from "@/lib/mock-data"

export default function PatientMessages() {
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Load thread on mount
  useEffect(() => {
    const threads = MessageService.getThreads();
    const myThread = threads[0];
    setSelectedThread(myThread);
  }, []);

  // Poll for messages
  useEffect(() => {
    if (!selectedThread) return;

    const loadMessages = () => {
      const msgs = MessageService.getMessages(selectedThread.id);
      setMessages(msgs);
    };

    loadMessages();
    const interval = setInterval(loadMessages, 1000);
    return () => clearInterval(interval);
  }, [selectedThread]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedThread) {
      MessageService.sendMessage(selectedThread.id, 'patient', newMessage);
      setNewMessage("");
      setMessages(MessageService.getMessages(selectedThread.id));
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 h-[calc(100vh-64px)] lg:h-screen flex flex-col max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Messages</h1>
          <p className="text-muted-foreground">Communicate with your care team</p>
        </div>
        <Button onClick={() => setShowNewMessageDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      {/* Messages Layout */}
      <div className="flex-1 grid gap-4 lg:grid-cols-[300px_1fr] min-h-0">
        {/* Thread List - Hidden for Patient Demo since they usually only have one thread */}
        <Card className="hidden lg:flex flex-col">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <div className="p-4 text-center text-muted-foreground">
            conversation list
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="flex flex-col min-h-0 col-span-2 lg:col-span-1">
          {selectedThread ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Stethoscope className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base text-foreground">Dr. Chen&apos;s Office</CardTitle>
                    <p className="text-sm text-muted-foreground">Your care team</p>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {messages.map((message) => {
                      const isPatient = message.senderRole === 'patient'
                      return (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${isPatient ? 'flex-row-reverse' : ''}`}
                        >
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isPatient ? 'bg-primary' : 'bg-primary/10'
                            }`}>
                            {isPatient ? (
                              <User className="h-4 w-4 text-primary-foreground" />
                            ) : (
                              <Stethoscope className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div className={`flex flex-col max-w-[70%] ${isPatient ? 'items-end' : ''}`}>
                            <div className={`rounded-lg p-3 ${isPatient
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
                <p className="text-muted-foreground">Loading conversation...</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* New Message Dialog */}
      <Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
            <DialogDescription>
              Send a message to your care team.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
              <Stethoscope className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Dr. Chen&apos;s Office</span>
            </div>
            <Textarea
              placeholder="Type your message here..."
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewMessageDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowNewMessageDialog(false)}>
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
