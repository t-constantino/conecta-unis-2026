{/* Info */}
          <div className="px-6 pb-6 relative z-10">
            <div className="flex flex-wrap items-end gap-4 -mt-12 mb-4">
              {avatarFailed ? (
                <div
                  className="w-20 h-20 shrink-0 rounded-2xl border-4 flex items-center justify-center text-xl font-bold relative z-10"
                  style={{ borderColor: 'var(--color-card)', background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
                  aria-label={`Foto de perfil de ${profile.name}`}
                >
                  {profile.name.slice(0, 2).toUpperCase()}
                </div>
              ) : (
                <img
                  src={avatar}
                  alt={`Foto de perfil de ${profile.name}`}
                  className="w-20 h-20 shrink-0 rounded-2xl object-cover border-4 relative z-10"
                  style={{ borderColor: 'var(--color-card)', background: 'var(--color-muted)' }}
                  onError={() => setAvatarFailed(true)}
                />
              )}
              <div className="mb-1 min-w-0 pt-2 flex-1">
                <h1 className="text-2xl font-bold leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-foreground)' }}>{profile.name}</h1>
                <div className="text-sm mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
                  {profile.course} · {profile.university} · {profile.semester}
                </div>
              </div>
              <div className="w-full sm:w-auto sm:ml-auto flex flex-wrap gap-2">
                <button onClick={openEditor} className="px-4 py-2 rounded-full text-sm font-semibold border transition-colors"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}>
                  Editar perfil
                </button>
                <button className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: 'var(--color-accent)', color: '#fff' }}>
                  Ver como empresa
                </button>
                {saved && (
                  <span className="w-full text-xs text-right" style={{ color: 'var(--color-accent)' }}>
                    Perfil atualizado com sucesso
                  </span>
                )}
              </div>
            </div>
