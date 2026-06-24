import LoginForm from './LoginForm';

export const metadata = { title: 'Login Admin - MTI CMS' };

export default function LoginPage() {
  return (
    <div className="adminLoginWrap">
      <div className="adminLoginCard">
        <div className="adminLoginBrand">
          <strong>MTI CMS</strong>
          <p>Masuk untuk mengelola konten</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
