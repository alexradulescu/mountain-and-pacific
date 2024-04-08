import { FormEvent, MouseEvent, useState } from 'react'

import {
  Alert,
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title
} from '@mantine/core'
import { useNavigate } from '@remix-run/react'
import { useMutation } from '@tanstack/react-query'
import { InfoCircle } from 'iconoir-react'

import { supabase } from '~/utils/supabaseClient'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const {
    mutate: mutateWithOtp,
    isPending: isPendingWithOtp,
    error: errorWithOtp
  } = useMutation({
    mutationFn: async (email: string) => {
      const response = await supabase.auth.signInWithOtp({
        email,
        options: {
          /** The redirect url embedded in the email link */
          emailRedirectTo: 'http://localhost:5173/'
        }
      })
      if (response.error) {
        throw new Error(response.error.message)
      }

      return response
    },
    onSuccess: (data) => {
      console.info(`onSuccess`, { data })
      navigate('/')
    }
  })

  const {
    mutate: mutateWithPassword,
    error: errorWithPassword,
    isPending: isPendingWithPassword
  } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await supabase.auth.signInWithPassword({
        email,
        password
      })

      console.info(`mutateWithPassword`, { response })

      if (response.error) {
        throw new Error(response.error.message)
      }
      return response
    },
    onSuccess: (data) => {
      console.info(`onSuccess`, { data })
      navigate('/')
    }
  })

  const handleLoginWithOtp = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    await mutateWithOtp(email)
  }

  const handleLoginWithPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await mutateWithPassword({ email, password })
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper component={'form'} withBorder shadow="md" p={24} mt={30} radius="md" onSubmit={handleLoginWithPassword}>
        {errorWithPassword ? (
          <Alert variant="light" color="red" title="" icon={<InfoCircle />} mb="md">
            {errorWithPassword.message}
          </Alert>
        ) : null}
        {errorWithOtp ? (
          <Alert variant="light" color="red" title="" icon={<InfoCircle />} mb="md">
            {errorWithOtp.message}
          </Alert>
        ) : null}

        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" disabled={isPendingWithPassword} type="submit">
          Login with password
        </Button>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          OR
        </Text>
        <Button variant="subtle" fullWidth onClick={handleLoginWithOtp} disabled={isPendingWithOtp}>
          Login with magic link
        </Button>
      </Paper>
    </Container>
  )
}
