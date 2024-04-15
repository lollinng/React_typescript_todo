import { Link, useSearchParams } from 'react-router-dom'

const Navbar = () => {
  const [searchPrams] = useSearchParams();
  let todosData = searchPrams.get("todos");

  return (
    // checking link if link param data same then active css with class active
    <nav>
        <Link to='/' className={todosData==null?'active':''}>All</Link>
        <Link to='/?todos=active' className={todosData=='active'?'active':''}>Active</Link>
        <Link to='/?todos=completed' className={todosData=='completed'?'active':''}>Completed</Link>
    </nav>
  )
}

export default Navbar