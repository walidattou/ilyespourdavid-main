"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"
import emailjs from "@emailjs/browser"

export default function NewsletterForm() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const templateParams = {
        prenom: "Newsletter",
        nom: "Subscriber",
        adresse: "",
        ville: "",
        province: "",
        code_postal: "",
        telephone: "",
        email: email,
        sujet: "Nouvelle inscription newsletter",
        message: `Nouvelle inscription à la newsletter: ${email}`
      }

      console.log('Sending EmailJS newsletter form with params:', templateParams)

      const result = await emailjs.send(
        'service_vygi4wf',
        'template_gmlhh5g',
        templateParams,
        '47Sfd5g4f9BnD8uls'
      )

      console.log('EmailJS newsletter form result:', result)

      setEmail("")
      toast({
        title: t("forms.subscriptionSuccess"),
        description: t("forms.newsletterSubscribed"),
      })

    } catch (error) {
      console.error('EmailJS Error:', error)
      toast({
        title: "Erreur lors de l'inscription",
        description: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <Input
        type="email"
        placeholder={t("common.email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
      />
      <Button type="submit" disabled={isLoading} className="bg-brand-700 hover:bg-brand-800 text-white">
        {isLoading ? "..." : t("footer.subscribeBtn")}
      </Button>
    </form>
  )
}
