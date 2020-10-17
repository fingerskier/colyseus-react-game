const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const touch = require('touch')

/* Usage
This is a wrapper for json that gets saved to disk periodically
*/

class Context {
  constructor(filePath,defaultValue={}) {
    this.filePath = filePath || './context.json'
    this.data = defaultValue
    
    try {
      this.data = require(this.filePath)
      console.log('context loaded:', this.filePath)
    } catch (error) {
      console.log(`creating context ${this.filePath}`)
      const directory = path.dirname(this.filePath)

      mkdirp(directory)
      .then(made=>{
        touch(this.filePath)
        this.save()
      })
    }

    return new Proxy(this.data, {
      set: (obj, prop, value) => {
        this.data[prop] = value
        this.save()
        
        return true
      },
      get: (obj, prop) => {
        return this.data[prop]
      }
    })
  }

  save() {
    fs.writeFile(this.filePath, JSON.stringify(this.data), err=>{
      if (err) console.error(err)
      console.log('context created @', this.filePath)
    })
  }
}

module.exports = Context