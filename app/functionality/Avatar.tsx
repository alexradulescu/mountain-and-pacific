import { ChangeEvent, useEffect, useState } from 'react'
import { supabase } from '~/utils/supabaseClient'

interface AvatarProps {
  url: string | null
  size: number
  onUpload: (event: ChangeEvent<HTMLInputElement>, filePath: string) => void
}

export const Avatar = ({ url, size, onUpload }: AvatarProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(event, filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {avatarUrl ? (
        <img src={avatarUrl} alt="Avatar" className="avatar image" style={{ height: size, width: size }} />
      ) : (
        <p>No Avatar Image</p>
      )}
      <label>
        <span>{uploading ? 'Uploading ...' : 'Upload'}</span>
        <input type="file" id="single" accept="image/*" onChange={uploadAvatar} disabled={uploading} />
      </label>
    </div>
  )
}
