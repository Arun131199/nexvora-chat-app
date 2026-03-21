import { Building, Building2, CircleCheck, Lock, Mail, Shield } from 'lucide-react'
import CustomeInputField from '../../components/CustomeInputField'
import CustomButton from '../../components/CustomButton'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch'
import { loginThunk, clearError } from '../../store/slices/authSlice'

interface LoginData {
    email: string;
    password: string;
    isConfirmed: boolean;
}

export default function Login() {
    const [getLoginData, setGetLoginData] = useState<LoginData>({
        email: "",
        password: "",
        isConfirmed: false
    })

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { isLoading, error, currentUser } = useAppSelector(
        (state) => state.auth
    )

    // ✅ Already logged in-ஆ இருந்தா redirect
    useEffect(() => {
        if (currentUser) {
            navigate("/dashboard")
        }
    }, [currentUser])

    // ✅ Error clear — page load-ல
    useEffect(() => {
        dispatch(clearError())
    }, [])

    const handleOnchange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target
        setGetLoginData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // ✅ Submit — API call பண்ணு
    const handleSubmit = async () => {
        if (!getLoginData.email || !getLoginData.password) return

        const result = await dispatch(loginThunk({
            email: getLoginData.email,
            password: getLoginData.password,
        }))

        if (loginThunk.fulfilled.match(result)) {
            // ✅ isConfirmed — Remember me
            if (!getLoginData.isConfirmed) {
                // Session மட்டும் — tab close பண்ணா logout
                sessionStorage.setItem("token", result.payload.token)
                localStorage.removeItem("token")
            }
            navigate("/dashboard")
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <section className="border border-gray-800 rounded-md bg-[#0b1220] p-6 max-w-md w-full shadow-xl space-y-4">

                <div className="flex justify-center">
                    <div className="border-2 rounded-md p-3 border-[#3b82f6]/60 bg-[#3b82f6]/20 flex items-center justify-center">
                        <Building2 size={25} className="text-[#3b82f6]" />
                    </div>
                </div>

                <div className='space-y-2 text-center'>
                    <p className='text-white text-xl leading-snug'>
                        Sign in with your work <br /> account
                    </p>
                    <p className='text-gray-400 text-sm leading-snug'>
                        Use your company email to continue to your <br /> workspace
                    </p>
                </div>

                {/* ✅ Error message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
                        <p className="text-red-400 text-sm text-center">{error}</p>
                    </div>
                )}

                <form
                    className='space-y-6'
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}
                >
                    <CustomeInputField
                        name='email'
                        label='Work Email'
                        type='email'
                        placeholder='you@company.com'
                        icon={<Mail size={18} />}
                        onChangeInput={handleOnchange}
                    />

                    <CustomeInputField
                        name='password'
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        icon={<Lock size={18} />}
                        onChangeInput={handleOnchange}
                    />

                    <div className='flex items-start gap-3'>
                        <Shield size={20} className='text-[#3b82f5] mt-1' />
                        <p className='text-gray-400 text-sm leading-relaxed'>
                            Only Organization accounts are allowed.
                            Contact your IT admin if you don't have access.
                        </p>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <input
                                type="checkbox"
                                name="isConfirmed"
                                className='accent-[#3b82f5]'
                                onChange={(e) =>
                                    setGetLoginData(prev => ({
                                        ...prev,
                                        isConfirmed: e.target.checked
                                    }))
                                }
                            />
                            <p className='text-sm text-[#3b82f5]'>Keep me signed in</p>
                        </div>

                        <button
                            type='button'
                            className='text-[#3b82f5] text-sm font-semibold cursor-pointer'
                        >
                            Need help?
                        </button>
                    </div>

                    <div className='flex items-center justify-center'>
                        {/* ✅ Loading spinner */}
                        <CustomButton
                            label={isLoading ? "Signing in..." : "Continue with company email"}
                            onClick={handleSubmit}
                            disabled={isLoading || !getLoginData.email || !getLoginData.password}
                        />
                    </div>

                    <div className='flex items-center gap-3'>
                        <div className='flex-1 border-t border-gray-700'></div>
                        <p className='text-xs text-gray-500 font-semibold whitespace-nowrap'>
                            ORGANIZATION ACCESS
                        </p>
                        <div className='flex-1 border-t border-gray-700'></div>
                    </div>

                    <div className='flex gap-3 items-center justify-center'>
                        <CustomButton
                            label='SSO Login'
                            icon={<CircleCheck size={18} />}
                            variant='secondary'
                        />
                        <CustomButton
                            label='Join Workspace'
                            icon={<Building size={18} />}
                            variant='secondary'
                        />
                    </div>

                    <p className='text-center text-xs text-gray-500'>
                        Restricted to verified business domains only
                    </p>

                </form>
            </section>
        </main>
    )
}