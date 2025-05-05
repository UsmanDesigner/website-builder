"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Download, Globe, Code, Copy, Smartphone, Tablet, Monitor } from "lucide-react"
import { generateHtmlCode } from "@/lib/html-generator"
import type { ComponentType } from "@/lib/types"

interface ExportPanelProps {
  components: ComponentType[]
  styles: any
  onClose: () => void
}

export function ExportPanel({ components, styles, onClose }: ExportPanelProps) {
  const [activeTab, setActiveTab] = useState("download")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployUrl, setDeployUrl] = useState("")
  const [siteName, setSiteName] = useState("")
  const [htmlCode, setHtmlCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [previewDevice, setPreviewDevice] = useState("desktop")

  const handleGenerateHtml = async () => {
    setIsGenerating(true)
    try {
      // In a real app, this would be more complex and generate a complete HTML file
      const html = generateHtmlCode(components, styles)
      setHtmlCode(html)
    } catch (error) {
      console.error("Error generating HTML:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!htmlCode) {
      handleGenerateHtml()
      return
    }

    // Create a blob with the HTML content
    const blob = new Blob([htmlCode], { type: "text/html" })
    const url = URL.createObjectURL(blob)

    // Create a temporary link and trigger download
    const a = document.createElement("a")
    a.href = url
    a.download = "website.html"
    document.body.appendChild(a)
    a.click()

    // Clean up
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDeploy = async () => {
    if (!siteName) return

    setIsDeploying(true)
    try {
      // In a real app, this would connect to a deployment service
      // For this demo, we'll simulate a deployment
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setDeployUrl(`https://${siteName.toLowerCase().replace(/\s+/g, "-")}.example.com`)
    } catch (error) {
      console.error("Error deploying site:", error)
    } finally {
      setIsDeploying(false)
    }
  }

  const handleCopyCode = () => {
    if (!htmlCode) {
      handleGenerateHtml()
      return
    }

    navigator.clipboard.writeText(htmlCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Export Website</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="download" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="download">
              <Download className="h-4 w-4 mr-2" />
              Download
            </TabsTrigger>
            <TabsTrigger value="deploy">
              <Globe className="h-4 w-4 mr-2" />
              Deploy
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code className="h-4 w-4 mr-2" />
              Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="download" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Download your website as a responsive HTML file that works on all devices.
            </p>

            <div className="border rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">Preview</h3>
                <div className="flex gap-2">
                  <Button
                    variant={previewDevice === "mobile" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewDevice("mobile")}
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={previewDevice === "tablet" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewDevice("tablet")}
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={previewDevice === "desktop" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewDevice("desktop")}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div
                className={`border rounded-md mx-auto overflow-hidden transition-all ${
                  previewDevice === "mobile"
                    ? "w-[320px] h-[480px]"
                    : previewDevice === "tablet"
                      ? "w-[768px] h-[1024px]"
                      : "w-full h-[400px]"
                }`}
              >
                {htmlCode ? (
                  <iframe srcDoc={htmlCode} className="w-full h-full border-0" title="Website Preview" />
                ) : (
                  <div className="flex items-center justify-center h-full bg-muted">
                    <p className="text-sm text-muted-foreground">Generate HTML to preview</p>
                  </div>
                )}
              </div>
            </div>

            <Button onClick={handleGenerateHtml} disabled={isGenerating} className="mr-2">
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Code className="h-4 w-4 mr-2" />
                  Generate Preview
                </>
              )}
            </Button>

            <Button onClick={handleDownload} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download HTML
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="deploy" className="space-y-4">
            <p className="text-sm text-muted-foreground">Deploy your responsive website directly to a custom domain.</p>

            <div className="space-y-2">
              <Label htmlFor="site-name">Site Name</Label>
              <Input
                id="site-name"
                placeholder="my-awesome-site"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
            </div>

            {deployUrl && (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm font-medium">Site deployed successfully!</p>
                <a
                  href={deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {deployUrl}
                </a>
              </div>
            )}

            <Button onClick={handleDeploy} disabled={isDeploying || !siteName}>
              {isDeploying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Globe className="h-4 w-4 mr-2" />
                  Deploy Website
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              View and copy the generated responsive HTML code for your website.
            </p>

            <div className="relative">
              <Button size="sm" variant="ghost" className="absolute top-2 right-2 h-8 w-8 p-0" onClick={handleCopyCode}>
                {copied ? <span className="text-xs text-green-500">Copied!</span> : <Copy className="h-4 w-4" />}
              </Button>

              <pre className="p-4 bg-muted rounded-md overflow-auto max-h-[300px] text-xs">
                {htmlCode || "Click 'Generate Code' to view the HTML"}
              </pre>
            </div>

            <Button onClick={handleGenerateHtml} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Code className="h-4 w-4 mr-2" />
                  Generate Code
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
