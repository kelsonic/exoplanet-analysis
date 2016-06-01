csv = SmarterCSV.process('./tmp/wowah_data.csv')

p "HOlY MOLY. It converted the csv to an array."
p "The total characters of the file is #{csv.size}"

count = 0
csv.each do |character|
  count += 1
  Character.create!(
    level: character[:level].to_i,
    race: character[:race],
    charclass: character[:charclass],
    zone: character[:zone],
    guild: character[:guild]
  )
  p "Created character #{count}"
end

