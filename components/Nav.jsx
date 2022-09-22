import { useRef, useEffect } from 'react';
import {
  Bars3Icon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link';
import { nanoid } from 'nanoid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Nav({ models, currentModel }) {
  const groups = models.reduce((groups, item) => {
    const group = groups[item.pnu] || [];
    group.push(item);
    groups[item.pnu] = group;
    return groups;
  }, {});

  const selectedRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current && selectedRef.current) {
      containerRef.current.scrollTo(0, selectedRef.current.offsetTop - 100);
    }
  }, []);

  return (
    <>
      <div>
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <img
                  className="h-8 w-auto"
                  src="https://flexity.app/static/media/ic_gnb_logo.20051675ec85473c9a217dcf25b611db.svg"
                  alt="Your Company"
                />
              </div>
              <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                {models.map((item) => (
                  <Link
                  key={nanoid()}
                  href={`/${item.slug}`}                  
                >
                  <a className={classNames(
                    item.slug === currentModel ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  )}>
                  {item.slug}
                  </a>
                </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}
