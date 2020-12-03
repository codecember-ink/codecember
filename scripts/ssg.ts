import { execSync } from 'child_process'
import path from 'path'
// @ts-ignore
import chromium from 'chromium'
import fs from 'fs-extra'
import fg from 'fast-glob'

async function run() {
  if (fs.existsSync('.presite'))
    await fs.remove('.presite')

  execSync(`npx cross-env CHROME_PATH="${chromium.path}" presite dist`, { stdio: 'inherit' })

  // /2020/1/index.html -> /2020/1.html
  const cwd = path.join('.presite/2020')
  const files = await fg('*/index.html', { cwd })
  for (const file of files) {
    await fs.move(path.join(cwd, file), path.join(cwd, `${file.split('/')[0]}.html`))
    await fs.remove(path.join(cwd, file.split('/')[0]))
  }
}

run()
